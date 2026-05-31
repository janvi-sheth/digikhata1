import { useGetSpendingHistory } from "@workspace/api-client-react";
import { formatCurrency, CATEGORY_LABELS } from "../lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function History() {
  const { data: history, isLoading } = useGetSpendingHistory();

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-serif text-foreground">History</h1>
        <p className="text-sm text-muted-foreground mt-1">Your recent transactions.</p>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : !history || history.length === 0 ? (
        <div className="text-center py-20">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-muted-foreground font-serif">₹</span>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">No spending yet</h3>
          <p className="text-sm text-muted-foreground">Log your first transaction on the Home tab.</p>
        </div>
      ) : (
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {history.map((item, idx) => (
            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/10 text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-card border shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-foreground">{CATEGORY_LABELS[item.category] || item.category}</span>
                  <span className="font-bold text-foreground">{formatCurrency(item.amount)}</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span className="truncate pr-4">{item.note || "No note"}</span>
                  <span className="shrink-0">{format(new Date(item.createdAt), "MMM d, h:mm a")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
