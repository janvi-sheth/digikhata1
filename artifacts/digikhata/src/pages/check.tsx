import React, { useState } from "react";
import {
  useCheckIntent,
  useLogSpending,
  getGetBudgetSummaryQueryKey,
  getGetSpendingHistoryQueryKey,
} from "@workspace/api-client-react";
import { formatCurrency, CATEGORY_LABELS, CATEGORIES } from "../lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Info, ExternalLink, ShoppingBag } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Check() {
  const checkIntent = useCheckIntent();
  const logSpending = useLogSpending();
  const queryClient = useQueryClient();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("shopping");
  const [logged, setLogged] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !price || isNaN(Number(price))) return;
    setLogged(false);
    checkIntent.mutate({ data: { productName, price: Number(price), category } });
  };

  const handleLogPurchase = () => {
    if (!price || !productName) return;
    logSpending.mutate(
      {
        data: {
          amount: Number(price),
          category,
          note: productName,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetBudgetSummaryQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetSpendingHistoryQueryKey() });
          setLogged(true);
          toast.success(`₹${Number(price).toLocaleString("en-IN")} logged under ${CATEGORY_LABELS[category] ?? category}`);
        },
      }
    );
  };

  const result = checkIntent.data;

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Check Purchase</h1>
        <p className="text-sm text-muted-foreground mt-1">Let's see if this fits your budget.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label>What do you want to buy?</Label>
          <Input
            placeholder="e.g. Sony Headphones"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-card text-lg h-12"
            required
            data-testid="input-product-name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price (₹)</Label>
            <Input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-card text-lg h-12"
              min="1"
              required
              data-testid="input-price"
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-card h-12" data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((key) => (
                  <SelectItem key={key} value={key}>
                    {CATEGORY_LABELS[key] ?? key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold"
          disabled={checkIntent.isPending}
          data-testid="button-check-purchase"
        >
          {checkIntent.isPending ? "Analyzing..." : "Evaluate Purchase"}
        </Button>
      </form>

      {result && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Nudge card */}
          <div
            className={`p-5 rounded-2xl border flex flex-col gap-3 shadow-sm ${
              result.nudge.severity === "warning"
                ? "bg-destructive/5 border-destructive/20"
                : result.nudge.severity === "info"
                ? "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/30"
                : result.nudge.severity === "alternative"
                ? "bg-secondary/30 border-secondary/50"
                : "bg-primary/5 border-primary/20"
            }`}
            data-testid="nudge-result"
          >
            <div className="flex gap-3">
              {result.nudge.severity === "warning" ? (
                <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
              ) : result.nudge.severity === "info" ? (
                <Info className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-bold text-base mb-1 text-foreground">
                  {result.nudge.message}
                </h3>
                {result.nudge.action && (
                  <p className="text-sm text-muted-foreground">{result.nudge.action}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Budget left</p>
                <p className="font-bold text-foreground">{formatCurrency(result.budgetImpact.remaining)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Pacing</p>
                <p className="font-bold text-foreground">
                  {result.budgetImpact.isOverpacing ? "Too fast" : "On track"}
                </p>
              </div>
            </div>
          </div>

          {/* Price alternatives */}
          {result.alternatives && result.alternatives.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-foreground">Better deals found</h4>
              <div className="space-y-2">
                {result.alternatives.map((alt, idx) => (
                  <Card key={idx} className="bg-card" data-testid={`card-alternative-${idx}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{alt.title || `${alt.platform} Deal`}</p>
                        <p className="text-sm text-muted-foreground">{alt.platform}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <p className="font-bold text-primary">{formatCurrency(alt.price)}</p>
                        {alt.link && alt.link !== "#" && (
                          <a
                            href={alt.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 flex items-center gap-1 hover:underline"
                          >
                            View <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Log this purchase */}
          {!logged ? (
            <Button
              variant="outline"
              className="w-full h-11 font-semibold gap-2"
              onClick={handleLogPurchase}
              disabled={logSpending.isPending}
              data-testid="button-log-purchase"
            >
              <ShoppingBag className="h-4 w-4" />
              {logSpending.isPending ? "Logging..." : `Log this purchase (${formatCurrency(Number(price))})`}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Logged to {CATEGORY_LABELS[category] ?? category}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
