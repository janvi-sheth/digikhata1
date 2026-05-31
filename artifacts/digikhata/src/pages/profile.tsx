import React, { useState, useEffect } from "react";
import { useGetUserProfile, useSaveSalary, getGetBudgetSummaryQueryKey, getGetUserProfileQueryKey } from "@workspace/api-client-react";
import { formatCurrency, CATEGORY_LABELS } from "../lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Wallet } from "lucide-react";

export default function Profile() {
  const { data: profile, isLoading } = useGetUserProfile();
  const saveSalary = useSaveSalary();
  const queryClient = useQueryClient();
  
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (profile?.salary) {
      setSalary(profile.salary.toString());
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salary || isNaN(Number(salary))) return;
    
    saveSalary.mutate({
      data: {
        salary: Number(salary)
      }
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetUserProfileQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetBudgetSummaryQueryKey() });
        toast.success("Salary updated. Budget recalculated.");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-serif text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your income and buckets.</p>
      </header>

      <Card className="bg-card shadow-sm border-primary/20">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Monthly Salary (₹)</Label>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="number" 
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="pl-10 text-xl font-medium h-14 bg-background"
                  placeholder="e.g. 50000"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={saveSalary.isPending}>
              {saveSalary.isPending ? "Updating..." : "Update Salary"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {profile?.budget && (
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-serif text-lg text-foreground">Smart Allocation</h3>
            <span className="text-xs text-muted-foreground">Based on your salary</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(profile.budget).map(([key, amount]) => {
              if (amount <= 0 && key !== 'rent') return null;
              return (
                <Card key={key} className="bg-background border shadow-sm">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1 font-medium">{CATEGORY_LABELS[key] || key}</p>
                    <p className="text-lg font-semibold text-foreground">{formatCurrency(amount)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
