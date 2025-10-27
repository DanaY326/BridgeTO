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
import { categories } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/UserTypes";
import { AlertCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UpgInfo } from "@/components/upgInfo";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [suggestUpg, setSuggestUpg] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name:  "",
    description:  "",
    datetime:  "",
    groups:  [],
    approved: true,
    distance: 0,
    category:  "",
    organization:  ""
  });

  const { user, role } = useUser();
  const [newGroup, setNewGroup] = useState(""); // Add this state for group input

  const handleAddGroup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newGroup.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        groups: [...prev.groups, newGroup.trim()]
      }));
      setNewGroup("");
    }
  };

  const handleRemoveGroup = (groupToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      groups: prev.groups.filter(group => group !== groupToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || !formData.category || !formData.datetime || !formData.organization) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Submitted",
      description: "Your event has been shared with churches in your area.",
    });

    // Navigate to requests page after submission
    setTimeout(() => navigate("/find"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Submit Event</h1>
            <p className="text-muted-foreground text-lg">
              Create an event to engage with underserved communities and make a difference.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="requester">Your Organization</Label>
                  <Input
                    id="organization"
                    placeholder="Your organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Event Name *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Community Outreach Gathering"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                </div>

                <div className="space-y-2">
                  <Label htmlFor="datetime">Date and Time *</Label>
                  <Input
                    id="datetime"
                    type="datetime-local"
                    value={formData.datetime}
                    onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                    required
                  />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groups">People Groups</Label>
                  <div className="space-y-4">
                    <Input
                      id="groups"
                      placeholder="Type a group name and press Enter"
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value)}
                      onKeyDown={handleAddGroup}
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.groups.map(group => (
                        <Badge 
                          key={group} 
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          {group}
                          <button
                            type="button"
                            onClick={() => handleRemoveGroup(group)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Add suggestion button */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm text-muted-foreground">Need inspiration?</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setSuggestUpg(!suggestUpg)}
                    className="w-full"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {suggestUpg ? "Close UPG Suggestion" : "Get UPG Suggestions"}
                  </Button>
                  {suggestUpg && (
                    <div className="mt-4">
                      <UpgInfo />
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full">
                    Submit Event
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

export default CreateEvent;
