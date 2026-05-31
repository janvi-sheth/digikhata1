import React, { useState } from "react";
import { useGetBudgetSummary, useLogSpending, getGetBudgetSummaryQueryKey, getGetSpendingHistoryQueryKey } from "@workspace/api-client-react";
import { formatCurrency, CATEGORY_LABELS, spendingPace } from "../lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle2, Info, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function LogDialog({
  open,
  onOpenChange,
  defaultCategory,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultCategory: string;
}) {
  const queryClient = useQueryClient();
  const logSpending = useLogSpending();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [note, setNote] = useState("");

  React.useEffect(() => {
    setCategory(defaultCategory);
  }, [defaultCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    logSpending.mutate(
      { data: { amount: Number(amount), category, note: note || undefined } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetBudgetSummaryQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetSpendingHistoryQueryKey() });
          onOpenChange(false);
          setAmount("");
          setNote("");
          toast.success("Transaction logged");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Log Spending</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-card" data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_LABELS)
                  .filter(([k]) => k !== "electronics")
                  .map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Amount (₹)</Label>
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg bg-card"
              min="1"
              required
              data-testid="input-amount"
            />
          </div>
          <div className="space-y-2">
            <Label>Note <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input
              placeholder="What was this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-card"
              data-testid="input-note"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11"
            disabled={logSpending.isPending}
            data-testid="button-submit-log"
          >
            {logSpending.isPending ? "Logging..." : "Log Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Dashboard() {
  const { data: summary, isLoading } = useGetBudgetSummary();
  const [logOpen, setLogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("groceries");

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const dayOfMonth = today.getDate();

  function openLogFor(cat: string) {
    setActiveCategory(cat);
    setLogOpen(true);
  }

  if (isLoading || !summary) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
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
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Your financial health this month.</p>
        </div>
        <Button
          size="icon"
          className="rounded-full h-11 w-11 shadow-md"
          onClick={() => openLogFor("groceries")}
          data-testid="button-log-spending"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </header>

      {summary.activeNudges && summary.activeNudges.length > 0 && (
        <section className="space-y-3">
          {summary.activeNudges.map((nudge, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-start gap-3 shadow-sm ${
                nudge.severity === "warning"
                  ? "bg-destructive/5 border-destructive/20"
                  : nudge.severity === "info"
                  ? "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/30"
                  : "bg-primary/5 border-primary/20"
              }`}
              data-testid={`nudge-card-${idx}`}
            >
              {nudge.severity === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              ) : nudge.severity === "info" ? (
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold text-sm text-foreground">{nudge.message}</p>
                {nudge.action && (
                  <p className="text-xs mt-1 text-muted-foreground">{nudge.action}</p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Safe to spend</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground" data-testid="text-remaining">
                {formatCurrency(Math.max(0, remaining))}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Spent</p>
              <p className="text-sm font-bold" data-testid="text-total-spent">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
          <div className="relative h-3 w-full bg-background/50 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                totalPace.isOverpacing ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${Math.min(100, (totalSpent / Math.max(totalBudget, 1)) * 100)}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-semibold text-muted-foreground">
            <span>Day {dayOfMonth} of {daysInMonth}</span>
            <span>{totalPace.isOverpacing ? "Pacing high" : "On track"}</span>
          </div>
        </CardContent>
      </Card>

      <section>
        <h3 className="font-bold text-lg text-foreground mb-4">Categories</h3>
        <div className="space-y-3">
          {Object.entries(summary.budget).map(([key, budgetedAmount]) => {
            if (budgetedAmount <= 0) return null;
            const spent = (summary.spending as unknown as Record<string, number>)[key] ?? 0;
            const pace = spendingPace(budgetedAmount, spent, dayOfMonth, daysInMonth);
            const percent = Math.min(100, (spent / budgetedAmount) * 100);

            return (
              <div
                key={key}
                className="bg-card border rounded-xl px-4 py-3 flex items-center gap-4 shadow-sm"
                data-testid={`card-category-${key}`}
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-foreground truncate">
                      {CATEGORY_LABELS[key] ?? key}
                    </span>
                    <span className="text-muted-foreground font-medium shrink-0 ml-2">
                      {formatCurrency(spent)}{" "}
                      <span className="opacity-50">/ {formatCurrency(budgetedAmount)}</span>
                    </span>
                  </div>
                  <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ${
                        percent > 90
                          ? "bg-destructive"
                          : pace.isOverpacing
                          ? "bg-yellow-500"
                          : "bg-primary"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0 rounded-full hover:bg-primary/10 hover:text-primary"
                  onClick={() => openLogFor(key)}
                  data-testid={`button-add-expense-${key}`}
                  title={`Log ${CATEGORY_LABELS[key] ?? key} expense`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <LogDialog
        open={logOpen}
        onOpenChange={setLogOpen}
        defaultCategory={activeCategory}
      />
    </div>
  );
}
