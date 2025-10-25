import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { categories, locations } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/UserTypes";
import { AlertCircle } from "lucide-react";

const SubmitRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    requester: "",
    isAnonymous: false
  });

  const { user, role } = useUser();

  if (role !== UserRole.CHURCH) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto text-center space-y-6 p-8 bg-card rounded-lg shadow-sm border">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold">Access Restricted</h2>
            <p className="text-muted-foreground">
              This page is only accessible to church organizations. Please log in with a church to view prayer requests.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Prayer Request Submitted",
      description: "Your prayer request has been shared with churches in your area.",
    });

    // Navigate to requests page after submission
    setTimeout(() => navigate("/requests"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Submit Prayer Request</h1>
            <p className="text-muted-foreground text-lg">
              Share your prayer needs with churches in your community
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Prayer Request</CardTitle>
              <CardDescription>
                All information will be shared with churches. Choose "Anonymous" if you prefer not to share your name.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Prayer for Healing"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Share your prayer request in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== "All Categories").map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Select 
                      value={formData.location} 
                      onValueChange={(value) => setFormData({ ...formData, location: value })}
                      required
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.filter(l => l !== "All Locations").map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requester">Your Name</Label>
                  <Input
                    id="requester"
                    placeholder="Enter your name or leave blank for anonymous"
                    value={formData.requester}
                    onChange={(e) => setFormData({ ...formData, requester: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave blank to submit anonymously
                  </p>
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full">
                    Submit Prayer Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitRequest;
