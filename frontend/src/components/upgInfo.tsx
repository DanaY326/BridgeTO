import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { set } from "date-fns";

export const UpgInfo = () => {
    const [upgInfo, setUpgInfo] = useState("");
    const [upgBlurb, setUpgBlurb] = useState("");
    const [upgImgUrl, setUpgImgUrl] = useState("");
    const [upgMapUrl, setUpgMapUrl] = useState("");

    useEffect(() => {
    const fetchUpgData = async () => {
        try {
            setUpgInfo("Loading...");
            const response = await fetch(`https://api.joshuaproject.net/v1/people_groups.json?api_key=${import.meta.env.VITE_JOSHUA_API_KEY}&countries=CA&include_profile_text=Y&least_reached=Y&include_resources=Y&limit=250&page=1`);
            const data = await response.json();
            const torontoData = data.filter((group: any) => group["LocationInCountry"] && group["LocationInCountry"].toLowerCase().includes("toronto"));
            const finalData = torontoData[Math.floor(Math.random()*torontoData.length)];
            if (finalData && typeof(finalData) === 'object') {
                setUpgInfo(`${finalData["PeopNameInCountry"] || ""} - ${finalData["LocationInCountry"].split(",").map(location => location.trim()).filter(location => location.toLowerCase().includes("toronto")) || ""} - ${finalData["PrimaryLanguageName"] + " speakers" || ""}`);
                setUpgBlurb(finalData["Summary"] || "");
                setUpgImgUrl(finalData["PeopleGroupPhotoURL"] || "");
                setUpgMapUrl(finalData["PeopleGroupMapExpandedURL"] || "");
            } else {
                setUpgInfo("No data found for the specified people group.");
            }
        } catch (error) {
            console.error("Error fetching data from Joshua Project API:", error);
            setUpgInfo("");
        }
    };
    fetchUpgData();
    }, []);
    return (

      <Card className="bg-gradient-to-br from-muted/50 to-background border border-accent/20">
        <CardHeader className="text-center space-y-4">
          <blockquote className="text-xl italic text-foreground/80 max-w-2xl mx-auto py-4">
            {upgInfo || "No data available at the moment."}
          </blockquote>
          <blockquote className="text-base text-foreground/70 max-w-3xl mx-auto">
            {upgBlurb || ""}
          </blockquote>
          <div className="flex flex-row gap-6 justify-center flex-wrap pt-4">
            {upgImgUrl && <img src={upgImgUrl} alt="An unreached people" className="max-h-60 object-cover rounded-md" />}
            {upgMapUrl && <img src={upgMapUrl} alt="Map" className="max-h-60 object-cover rounded-md" />}
          </div>
        </CardHeader>
      </Card>
    )
}