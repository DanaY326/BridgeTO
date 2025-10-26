import { useState } from "react";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockEvents, categories } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/UserTypes";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FindEvent = () => {
  const { user, role } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedChurchType, setSelectedChurchType] = useState("All Denominations");

  const filteredRequests = mockEvents.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || request.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Events</h1>
            <p className="text-muted-foreground text-lg">
              Join an event and support the least reached communities.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-lg p-6 shadow-sm border space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Request Cards */}
        <div className="space-y-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <EventCard 
                key={request.id} 
                event={request}
                onRespond={() => console.log("Respond to:", request.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No events found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindEvent;
