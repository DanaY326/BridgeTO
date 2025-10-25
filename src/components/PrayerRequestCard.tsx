import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Church, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Response {
  id: string;
  churchName: string;
  message: string;
  date: string;
}

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  requester: string;
  date: string;
  responses: Response[];
}

interface PrayerRequestCardProps {
  request: PrayerRequest;
  onRespond?: () => void;
}

const PrayerRequestCard = ({ request, onRespond }: PrayerRequestCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{request.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {request.location}
              </span>
              <span className="text-muted-foreground">•</span>
              <span>{request.date}</span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {request.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground/90 leading-relaxed">{request.description}</p>
        
        <div className="flex items-center gap-2 pt-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {request.requester.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">Requested by {request.requester}</span>
        </div>
        
        {request.responses.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Church className="h-4 w-4 text-primary" />
              <span>Church Responses ({request.responses.length})</span>
            </div>
            
            {request.responses.map((response) => (
              <div key={response.id} className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{response.churchName}</span>
                  <span className="text-xs text-muted-foreground">{response.date}</span>
                </div>
                <p className="text-sm text-foreground/80">{response.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={onRespond}
        >
          <MessageCircle className="h-4 w-4" />
          Respond as Church
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrayerRequestCard;
