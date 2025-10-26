import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/UserTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { UpgSearchResults } from "@/components/upgSearchResults";

const Resources = () => {
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(searchInput);
  };

  return (
    <div className="min-h-screen flex flex-col items-top bg-gradient-to-b from-background to-muted/30">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">Search People Groups</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter people group name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {name && 
      <Card>
        <UpgSearchResults query={name} />
      </Card>}
    </div>
  );
};

export default Resources;

