import { useState, useMemo, useEffect } from "react";
import { MapView } from "@/components/map/MapView";
import { FilterControls } from "@/components/map/FilterControls";
import { DataSidebar } from "@/components/map/DataSidebar";
import { StatsFooter } from "@/components/map/StatsFooter";
import { mockChurches } from "@/data/mockChurches";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen, Church, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

type ViewType = 'churches' | 'peopleGroups';

const Index = () => {
  const [viewType, setViewType] = useState<ViewType>('churches');
  const [searchQuery, setSearchQuery] = useState("");
  const [minRequests, setMinRequests] = useState(0);
  const [focusArea, setFocusArea] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (viewType === 'peopleGroups') {
    
  } else {

  // Calculate max possible requests from all churches
  const maxPossibleRequests = useMemo(() => {
    return Math.max(...mockChurches.map(c => c.openRequests), 0);
  }, []);

  // Filter churches based on search and min requests
  const filteredChurches = useMemo(() => {
    let filtered = mockChurches;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (church) =>
          church.name.toLowerCase().includes(query) ||
          church.area.toLowerCase().includes(query) ||
          church.peopleGroups.some((group) => group.toLowerCase().includes(query))
      );
    }

    // Apply min requests filter
    filtered = filtered.filter((church) => church.openRequests >= minRequests);

    return filtered;
  }, [searchQuery, minRequests]);

  // Auto-adjust slider if it exceeds all available values
  useEffect(() => {
    if (filteredChurches.length === 0 && minRequests > 0) {
      const maxAvailable = Math.max(...mockChurches.map(c => c.openRequests), 0);
      if (minRequests > maxAvailable) {
        setMinRequests(maxAvailable);
      }
    }
  }, [filteredChurches.length, minRequests]);

  // Calculate total stats
  const totalOpenRequests = useMemo(() => {
    return filteredChurches.reduce((sum, church) => sum + church.openRequests, 0);
  }, [filteredChurches]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />
      <MapView
        churches={filteredChurches}
        focusArea={focusArea}
        onClearFocus={() => setFocusArea(null)}
      />

      {/* Filter controls - top left */}
      <FilterControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        minRequests={minRequests}
        onMinRequestsChange={setMinRequests}
        maxPossibleRequests={maxPossibleRequests}
      />

      {/* Toggle sidebar button - top right */}
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 right-4 z-[1000] shadow-lg"
        size="icon"
        variant="secondary"
      >
        {sidebarOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
      </Button>

      {/* Stats footer - bottom right */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <StatsFooter
          totalChurches={filteredChurches.length}
          totalOpenRequests={totalOpenRequests}
        />
      </div>

      {/* Collapsible sidebar - right side */}
      <div
        className={`absolute top-12 right-0 h-full w-96 z-[999] transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full p-4 pr-20">
          <DataSidebar
            churches={filteredChurches}
            focusArea={focusArea}
            onFocusArea={setFocusArea}
            onClearFocus={() => setFocusArea(null)}
          />
        </div>
      </div>
    </div>
  );
}
};

export default Index;
