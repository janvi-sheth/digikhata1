import React, { useState } from "react";
import { useCheckIntent } from "@workspace/api-client-react";
import { formatCurrency, CATEGORY_LABELS, CATEGORIES } from "../lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Info, ExternalLink } from "lucide-react";

export default function Check() {
  const checkIntent = useCheckIntent();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("shopping");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !price || isNaN(Number(price))) return;
    
    checkIntent.mutate({
      data: {
        productName,
        price: Number(price),
        category
      }
    });
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-serif text-foreground">Check Purchase</h1>
        <p className="text-sm text-muted-foreground mt-1">Let's see if this fits your budget.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>What do you want to buy?</Label>
          <Input 
            placeholder="e.g. Sony Headphones" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-card text-lg h-12"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price (₹)</Label>
            <Input 
              type="number" 
              placeholder="0.00" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-card text-lg h-12"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-card h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(key => (
                  <SelectItem key={key} value={key}>{CATEGORY_LABELS[key] || key}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-lg" disabled={checkIntent.isPending}>
          {checkIntent.isPending ? "Analyzing..." : "Evaluate Purchase"}
        </Button>
      </form>

      {checkIntent.data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div 
            className={`p-5 rounded-2xl border flex flex-col gap-3 shadow-sm ${
              checkIntent.data.nudge.severity === 'warning' ? 'bg-destructive/5 border-destructive/20 text-destructive-foreground' : 
              checkIntent.data.nudge.severity === 'info' ? 'bg-blue-50 border-blue-100 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/30' : 
              'bg-primary/5 border-primary/20 text-primary-foreground'
            }`}
          >
            <div className="flex gap-3">
              {checkIntent.data.nudge.severity === 'warning' ? <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" /> : 
               checkIntent.data.nudge.severity === 'info' ? <Info className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" /> :
               <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />}
              <div>
                <h3 className="font-semibold text-base mb-1">{checkIntent.data.nudge.message}</h3>
                {checkIntent.data.nudge.action && <p className="text-sm opacity-90">{checkIntent.data.nudge.action}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-current/10">
              <div>
                <p className="text-xs opacity-70 mb-1">Budget left</p>
                <p className="font-semibold">{formatCurrency(checkIntent.data.budgetImpact.remaining)}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 mb-1">Pacing</p>
                <p className="font-semibold">{checkIntent.data.budgetImpact.isOverpacing ? "Too fast" : "On track"}</p>
              </div>
            </div>
          </div>

          {checkIntent.data.alternatives && checkIntent.data.alternatives.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Better deals found</h4>
              <div className="space-y-2">
                {checkIntent.data.alternatives.map((alt, idx) => (
                  <Card key={idx} className="bg-card">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{alt.title || `${alt.platform} Deal`}</p>
                        <p className="text-sm text-muted-foreground">{alt.platform}</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="font-bold text-primary">{formatCurrency(alt.price)}</p>
                        {alt.link && (
                          <a href={alt.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 flex items-center gap-1 mt-1 hover:underline">
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
        </div>
      )}
    </div>
  );
}
