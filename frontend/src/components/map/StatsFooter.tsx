import { Church, Heart } from "lucide-react";

interface StatsFooterProps {
  totalChurches: number;
  totalOpenRequests: number;
}

export function StatsFooter({ totalChurches, totalOpenRequests }: StatsFooterProps) {
  return (
    <div className="bg-card rounded-lg shadow-md p-4">
      <div className="flex items-center justify-around gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Church className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{totalChurches}</div>
            <div className="text-xs text-muted-foreground">Church Locations</div>
          </div>
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-accent/10">
            <Heart className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{totalOpenRequests}</div>
            <div className="text-xs text-muted-foreground">Total Events</div>
          </div>
        </div>
      </div>
    </div>
  );
}
