import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/UserTypes";

const Navbar = () => {
  const { role } = useUser();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Heart className="h-6 w-6 fill-primary text-primary" />
          <span className="bg-primary from-primary to-accent bg-clip-text text-transparent">
            BridgeTO
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"}
              className="transition-all"
            >
              Home
            </Button>
          </Link>
          <Link to="/create">
            <Button 
              variant={isActive("/") ? "outline" : "ghost"}
              className="transition-all"
            >
              Create Event
            </Button>
          </Link>
          <Link to="/find">
            <Button 
              variant={isActive("/") ? "outline" : "ghost"}
              className="transition-all"
            >
              Events
            </Button>
          </Link>
          <Link to="/resources">
            <Button 
              variant={isActive("/") ? "outline" : "ghost"}
              className="transition-all"
            >
              Resources
            </Button>
          </Link>
          <Link to="/map">
            <Button 
              variant={isActive("/") ? "outline" : "ghost"}
              className="transition-all"
            >
              Map
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
