import { useState } from "react";
import Navbar from "@/components/Navbar";
import PrayerRequestCard from "@/components/PrayerRequestCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockPrayerRequests, categories, churchTypes, locations } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/UserTypes";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrayerRequests = () => {
  const { user, role } = useUser();

  if (role === UserRole.NOT_LOGGED_IN) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto text-center space-y-6 p-8 bg-card rounded-lg shadow-sm border">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold">Access Restricted</h2>
            <p className="text-muted-foreground">
              This page is only accessible to individual users. Please log in with an individual account to view prayer requests.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" onClick={() => window.location.href = '/login'}>
                Log In
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/signup'}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedChurchType, setSelectedChurchType] = useState("All Denominations");
  const [prayerCount, setPrayerCount] = useState<Record<string, number>>({});

  const filteredRequests = mockPrayerRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || request.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || request.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  if (role === UserRole.CHURCH) {
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
    )
  }

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
