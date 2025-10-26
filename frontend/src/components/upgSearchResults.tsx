import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { set } from "date-fns";

interface UpgSearchProps {
  query: string;
}

export const UpgSearchResults = (params: UpgSearchProps) => {
    const { query } = params;
    const [message, setMessage] = useState("");
    const [finalData, setFinalData] = useState<Array<object>>([]);

    useEffect(() => {
    const fetchUpgData = async () => {
        try {
            setMessage("Loading...");
            const response = await fetch(`https://api.joshuaproject.net/v1/people_groups.json?api_key=${import.meta.env.VITE_JOSHUA_API_KEY}&countries=CA&include_profile_text=Y&least_reached=Y&include_resources=Y&limit=250&page=1`);
            const data = await response.json();
            const torontoData = data.filter((group: any) => group["LocationInCountry"] && group["LocationInCountry"].toLowerCase().includes("toronto"));
            if (query) {
              setFinalData(torontoData.filter((group: any) => group["PeopNameInCountry"] && group["PeopNameInCountry"].toLowerCase().includes(query.toLowerCase())));
            } else {
              setFinalData(torontoData);
            }
            if (finalData && typeof(finalData) === 'object') {
                setMessage("");
            } else {
                setMessage("No data found for the specified people group.");
            }
        } catch (error) {
            console.error("Error fetching data from Joshua Project API:", error);
            setMessage("");
        }
    };
    fetchUpgData();
    }, [query]);
    return (
      <div>
        <div>{message}</div>
        {finalData.length > 0 && finalData.map((group) => {
        return (
          <Card className="bg-gradient-to-br from-muted/50 to-background border border-accent/20 mb-4">
            <CardHeader className="text-center space-y-4">
              <blockquote className="text-xl italic text-foreground/80 max-w-2xl mx-auto py-4">
                {`${group["PeopNameInCountry"] || ""} - ${group["LocationInCountry"].split(",").map(location => location.trim()).filter(location => location.toLowerCase().includes("toronto")) || ""} - ${group["PrimaryLanguageName"] + " speakers" || ""}`}
              </blockquote>
              <blockquote className="text-base text-foreground/70 max-w-3xl mx-auto">
                {group["Summary"] || ""}
              </blockquote>
              <div className="flex flex-row gap-6 justify-center flex-wrap pt-4">
                {group["PeopleGroupPhotoURL"] && <img src={group["PeopleGroupPhotoURL"]} alt="An unreached people" className="max-h-60 object-cover rounded-md" />}
                {group["PeopleGroupMapExpandedURL"] && <img src={group["PeopleGroupMapExpandedURL"]} alt="Map" className="max-h-60 object-cover rounded-md" />}
              </div>
            </CardHeader>
          </Card>
        )
        })}
      </div>
    )
}