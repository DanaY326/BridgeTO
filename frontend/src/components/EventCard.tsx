import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Church, MessageCircle, Building, Calendar1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/data/mockData";

interface EventCardProps {
  event: Event;
  onRespond?: () => void;
}

const EventCard = ({ event, onRespond }: EventCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{event.name}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Building className="h-3 w-3" />
                {event.organization || "Unknown Organization"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.distance} km
              </span>
              <span className="flex items-center gap-1">
                <Calendar1 className="h-3 w-3" />
                {event.datetime}
              </span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {event.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground/90 leading-relaxed">{event.description}</p>
        
        {/* Add group tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {event.groups.map((group) => (
            <Badge 
              key={group}
              variant="secondary" 
              className={"bg-accent text-accent-foreground hover:bg-accent/80 transition-colors duration-200"}
            >
              {group}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={onRespond}
        >
          Attend
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
