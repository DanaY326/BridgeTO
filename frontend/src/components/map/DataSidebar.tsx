import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Church, AreaStats, PeopleGroupStats } from "@/types/church";
import { MapPin, Users, X } from "lucide-react";

interface DataSidebarProps {
  churches: Church[];
  focusArea: string | null;
  onFocusArea: (area: string) => void;
  onClearFocus: () => void;
}

export function DataSidebar({ churches, focusArea, onFocusArea, onClearFocus }: DataSidebarProps) {
  const areaStats = useMemo(() => {
    const statsMap = new Map<string, AreaStats>();
    churches.forEach((church) => {
      if (!statsMap.has(church.area)) {
        statsMap.set(church.area, {
          area: church.area,
          totalOpen: 0,
          totalAccepted: 0,
          churches: [],
        });
      }
      const stats = statsMap.get(church.area)!;
      stats.totalOpen += church.openRequests;
      stats.totalAccepted += church.acceptedRequests;
      stats.churches.push(church);
    });
    return Array.from(statsMap.values()).sort((a, b) => b.totalOpen - a.totalOpen);
  }, [churches]);

  const peopleGroupStats = useMemo(() => {
    const statsMap = new Map<string, PeopleGroupStats>();
    churches.forEach((church) => {
      if (!statsMap.has(church.area)) {
        statsMap.set(church.area, {
          area: church.area,
          groups: [],
          totalOpen: 0,
        });
      }
      const stats = statsMap.get(church.area)!;
      stats.totalOpen += church.openRequests;
      church.peopleGroups.forEach((group) => {
        if (!stats.groups.includes(group)) {
          stats.groups.push(group);
        }
      });
    });
    return Array.from(statsMap.values()).sort((a, b) => b.totalOpen - a.totalOpen);
  }, [churches]);

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      <Tabs defaultValue="areas" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="areas">Areas</TabsTrigger>
            <TabsTrigger value="groups">People Groups</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="areas" className="flex-1 overflow-y-auto px-4 pb-4 mt-4">
          <div className="space-y-3">
            {focusArea && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFocus}
                className="w-full justify-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Area Focus
              </Button>
            )}
            {areaStats.map((stat) => (
              <Card
                key={stat.area}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  focusArea === stat.area ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => onFocusArea(stat.area)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {stat.area}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Open Requests:</span>
                    <span className="font-semibold text-accent">{stat.totalOpen}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accepted:</span>
                    <span className="font-semibold text-primary">{stat.totalAccepted}</span>
                  </div>
                  <div className="text-xs text-muted-foreground pt-1">
                    {stat.churches.length} {stat.churches.length === 1 ? "church" : "churches"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 overflow-y-auto px-4 pb-4 mt-4">
          <div className="space-y-3">
            {focusArea && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFocus}
                className="w-full justify-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Area Focus
              </Button>
            )}
            {peopleGroupStats.map((stat) => (
              <Card
                key={stat.area}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  focusArea === stat.area ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => onFocusArea(stat.area)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    {stat.area}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {stat.groups.map((group) => (
                      <Badge key={group} variant="secondary" className="text-xs">
                        {group}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground pt-1">
                    {stat.totalOpen} open requests
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
