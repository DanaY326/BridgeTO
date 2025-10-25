import { useState } from "react";
import Navbar from "@/components/Navbar";
import PrayerRequestCard from "@/components/PrayerRequestCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockPrayerRequests, categories, churchTypes, locations } from "@/data/mockData";

const PrayerRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedChurchType, setSelectedChurchType] = useState("All Denominations");

  const filteredRequests = mockPrayerRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || request.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || request.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Prayer Requests</h1>
            <p className="text-muted-foreground text-lg">
              Browse and respond to prayer requests from your community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-lg p-6 shadow-sm border space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prayer requests..."
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

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Church Type</label>
                <Select value={selectedChurchType} onValueChange={setSelectedChurchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {churchTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
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
              <PrayerRequestCard 
                key={request.id} 
                request={request}
                onRespond={() => console.log("Respond to:", request.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No prayer requests found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerRequests;
