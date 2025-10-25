import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Church, MessageCircle, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-prayer.jpg";

const Index = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Connect Through Prayer
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Share your prayer requests and receive support from churches in your community
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/submit">
              <Button size="lg" className="gap-2 shadow-lg">
                <Heart className="h-5 w-5" />
                Submit Prayer Request
              </Button>
            </Link>
            <Link to="/requests">
              <Button size="lg" variant="outline" className="gap-2">
                <Church className="h-5 w-5" />
                View All Requests
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Share Your Request</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Submit your prayer needs and let the community know how they can support you through prayer.
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
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Receive Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Churches respond with prayers, encouragement, and support for your specific needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-0 shadow-xl">
            <CardHeader className="text-center py-12">
              <CardTitle className="text-3xl mb-4">Join Our Prayer Community</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Whether you need prayer or want to support others, you're welcome here. Together, we can make a difference through the power of prayer.
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
    </div>
  );
};

export default Index;
