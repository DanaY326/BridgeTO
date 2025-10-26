import { useEffect, useMemo, useState, useRef } from "react";
import L, { LatLngExpression } from "leaflet";
import { Church } from "@/types/church";
import { scaleRadius } from "@/utils/mapHelpers";
import { Badge } from "@/components/ui/badge";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  churches: Church[];
  focusArea?: string | null;
  onClearFocus?: () => void;
}

export function MapView({ churches, focusArea }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastValidCenter, setLastValidCenter] = useState<LatLngExpression>([43.6532, -79.3832]);

  const maxOpen = useMemo(() => 
    Math.max(...churches.map(c => c.openRequests), 1), 
    [churches]
  );

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [43.6532, -79.3832] as LatLngExpression,
      zoom: 10,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    churches.forEach((church) => {
      const radius = scaleRadius(church.openRequests, maxOpen);
      const marker = L.circleMarker([church.lat, church.lng], {
        radius: radius,
        fillColor: "hsl(351, 83%, 58%)",
        fillOpacity: 0.7,
        color: "hsl(351, 83%, 58%)",
        weight: 2,
      });

      const popupContent = `
        <div class="space-y-2 min-w-[200px] p-2">
          <h3 class="font-semibold text-base">${church.name}</h3>
          <p class="text-sm text-gray-600">${church.area}</p>
          <div class="flex gap-4 text-sm">
            <div>
              <span class="font-medium" style="color: hsl(351, 83%, 58%)">${church.openRequests}</span>
              <span class="text-gray-600 ml-1">Open</span>
            </div>
            <div>
              <span class="font-medium" style="color: hsl(221, 83%, 53%)">${church.acceptedRequests}</span>
              <span class="text-gray-600 ml-1">Accepted</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-1 mt-2">
            ${church.peopleGroups.map(group => 
              `<span class="inline-block bg-gray-200 rounded px-2 py-1 text-xs">${group}</span>`
            ).join('')}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [churches, maxOpen]);

  // Handle focus area changes
  useEffect(() => {
    if (!mapRef.current || churches.length === 0) return;

    if (focusArea) {
      const areaChurches = churches.filter(c => c.area === focusArea);
      if (areaChurches.length > 0) {
        const avgLat = areaChurches.reduce((sum, c) => sum + c.lat, 0) / areaChurches.length;
        const avgLng = areaChurches.reduce((sum, c) => sum + c.lng, 0) / areaChurches.length;
        const center: LatLngExpression = [avgLat, avgLng];
        mapRef.current.setView(center, 12);
        setLastValidCenter(center);
      } else {
        // No matches - stay at last valid center
        mapRef.current.setView(lastValidCenter, mapRef.current.getZoom());
      }
    } else if (churches.length > 0) {
      const avgLat = churches.reduce((sum, c) => sum + c.lat, 0) / churches.length;
      const avgLng = churches.reduce((sum, c) => sum + c.lng, 0) / churches.length;
      const center: LatLngExpression = [avgLat, avgLng];
      mapRef.current.setView(center, 10);
      setLastValidCenter(center);
    }
  }, [focusArea, churches, lastValidCenter]);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={containerRef} className="h-full w-full z-0" />
    </div>
  );
}
