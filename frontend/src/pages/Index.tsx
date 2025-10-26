import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Church, MessageCircle, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-prayer.jpg";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/UserTypes";
import { Eye } from "lucide-react"; 
import { useState, useEffect } from "react";
import { set } from "date-fns";
import { UpgInfo } from "@/components/upgInfo";

const Index = () => {
  const { role } = useUser();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-accent/20" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-primary bg-clip-text text-transparent">
            Building Connections to the Least Reached in Our Community
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Connect with your community by organizing events that support and uplift the least reached peoples through faith and fellowship.
          </p>

          <Card className="max-w-3xl mx-auto pt-1 bg-primary text-primary-foreground border-0 shadow-xl">
            <div className="mx-auto my-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Eye className="h-6 w-6 text-muted" />
            </div>
            <CardTitle className="text-2xl font-serif mb-4">Spotlight on Least Reached Peoples</CardTitle>
            <UpgInfo />
          </Card>
        </div>
      </section>

      {/* Features Section */}
      {role === UserRole.NOT_LOGGED_IN && (
        <>
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Church className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Host an Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Create community events focused on prayer, support, and fellowship for the least reached peoples.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Filter by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Find churches in your area or denomination that align with your faith tradition.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Browse Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Explore upcoming events hosted by churches and organizations dedicated to reaching underserved communities.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        // {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-primary text-primary-foreground border-0 shadow-xl">
              <CardHeader className="text-center py-12">
                <CardTitle className="text-3xl mb-4">Join Our Christian Community</CardTitle>
                <CardDescription className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                  Whether you want to connect with community or host events, you're welcome here. Together, we can make a difference.
                </CardDescription>
                <div className="mt-8">
                  <Link to="/requests">
                    <Button size="lg" variant="secondary" className="gap-2">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>
      </>
      )}

    </div>
  );
};

export default Index;
