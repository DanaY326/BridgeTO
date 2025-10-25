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
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PrayerConnect
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
          {role === UserRole.CHURCH && (
            <Link to="/submit">
              <Button 
                variant={isActive("/submit") ? "secondary" : "outline"}
                className="transition-all"
              >
                Submit Request
              </Button>
            </Link>
          )}
          {role === UserRole.INDIVIDUAL && (
            <Link to="/requests">
              <Button 
                variant={isActive("/requests") ? "default" : "ghost"}
                className="transition-all"
              >
                Prayer Requests
              </Button>
            </Link>
          )}
          {role === UserRole.NOT_LOGGED_IN && (
            <Link to="/login">
              <Button 
                variant={isActive("/submit") ? "secondary" : "outline"}
                className="transition-all"
              >
                Log in
              </Button>
            </Link>
          )}
          {role === UserRole.NOT_LOGGED_IN && (
            <Link to="/Signup">
              <Button 
                variant={isActive("/submit") ? "secondary" : "outline"}
                className="transition-all"
              >
                Sign up
              </Button>
            </Link>
          )}
          {role !== UserRole.NOT_LOGGED_IN && (
            <Link to="/logout">
              <Button 
                variant={isActive("/submit") ? "secondary" : "outline"}
                className="transition-all"
              >
                Logout
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
