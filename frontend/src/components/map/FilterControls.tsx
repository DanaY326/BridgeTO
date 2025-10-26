import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  minRequests: number;
  onMinRequestsChange: (value: number) => void;
  maxPossibleRequests: number;
}

export function FilterControls({
  searchQuery,
  onSearchChange,
  minRequests,
  onMinRequestsChange,
  maxPossibleRequests,
}: FilterControlsProps) {
  return (
    <div className="fixed top-20 left-4 z-[1000] bg-card rounded-lg shadow-lg p-4 w-80 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          Search Churches
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Name, area, or people group..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="min-requests" className="text-sm font-medium">
          Min. Open Events: {minRequests}
        </Label>
        <Slider
          id="min-requests"
          min={0}
          max={maxPossibleRequests}
          step={1}
          value={[minRequests]}
          onValueChange={(value) => onMinRequestsChange(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
}
