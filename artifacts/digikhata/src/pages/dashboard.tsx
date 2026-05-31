import React, { useState } from "react";
import { useGetBudgetSummary, useLogSpending, getGetBudgetSummaryQueryKey, getGetSpendingHistoryQueryKey } from "@workspace/api-client-react";
import { formatCurrency, CATEGORY_LABELS, spendingPace } from "../lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Info, PlusCircle, AlertTriangle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Dashboard() {
  const { data: summary, isLoading } = useGetBudgetSummary();
  const queryClient = useQueryClient();
  const logSpending = useLogSpending();
  
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("groceries");
  const [note, setNote] = useState("");

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    logSpending.mutate({
      data: {
        amount: Number(amount),
        category,
        note: note || undefined
      }
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetBudgetSummaryQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetSpendingHistoryQueryKey() });
        setIsLogOpen(false);
        setAmount("");
        setNote("");
        toast.success("Transaction logged successfully");
      }
    });
  };

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const dayOfMonth = today.getDate();

  if (isLoading || !summary) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const totalBudget = Object.values(summary.budget).reduce((a, b) => a + b, 0);
  const totalSpent = Object.values(summary.spending).reduce((a, b) => a + b, 0);
  const remaining = totalBudget - totalSpent;
  const totalPace = spendingPace(totalBudget, totalSpent, dayOfMonth, daysInMonth);

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Your financial health this month.</p>
        </div>
        <Dialog open={isLogOpen} onOpenChange={setIsLogOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
              <PlusCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Log Spending</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg bg-card"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Note (Optional)</Label>
                <Input 
                  placeholder="What was this for?" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-card"
                />
              </div>
              <Button type="submit" className="w-full" disabled={logSpending.isPending}>
                {logSpending.isPending ? "Logging..." : "Log Transaction"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {summary.activeNudges && summary.activeNudges.length > 0 && (
        <section className="space-y-3">
          {summary.activeNudges.map((nudge, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex items-start gap-3 shadow-sm ${
                nudge.severity === 'warning' ? 'bg-destructive/5 border-destructive/20 text-destructive-foreground' : 
                nudge.severity === 'info' ? 'bg-blue-50 border-blue-100 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/30' : 
                'bg-primary/5 border-primary/20 text-primary-foreground'
              }`}
            >
              {nudge.severity === 'warning' ? <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" /> : 
               nudge.severity === 'info' ? <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" /> :
               <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />}
              <div>
                <p className="font-medium text-sm text-foreground">{nudge.message}</p>
                {nudge.action && <p className="text-xs mt-1 opacity-80">{nudge.action}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Safe to spend</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {formatCurrency(Math.max(0, remaining))}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Spent</p>
              <p className="text-sm font-medium">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
          <div className="relative h-3 w-full bg-background/50 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                totalPace.isOverpacing ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-medium text-muted-foreground">
            <span>Day {dayOfMonth} of {daysInMonth}</span>
            <span>{totalPace.isOverpacing ? "Pacing high" : "On track"}</span>
          </div>
        </CardContent>
      </Card>

      <section>
        <h3 className="font-serif text-lg text-foreground mb-4">Categories</h3>
        <div className="space-y-5">
          {Object.entries(summary.budget).map(([key, budgetedAmount]) => {
            if (budgetedAmount <= 0) return null;
            const spent = (summary.spending as any)[key] || 0;
            const pace = spendingPace(budgetedAmount, spent, dayOfMonth, daysInMonth);
            const percent = Math.min(100, (spent / budgetedAmount) * 100);
            
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{CATEGORY_LABELS[key] || key}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(spent)} <span className="opacity-50">/ {formatCurrency(budgetedAmount)}</span>
                  </span>
                </div>
                <div className="relative h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ${
                      percent > 90 ? "bg-destructive" : pace.isOverpacing ? "bg-yellow-500" : "bg-primary"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
