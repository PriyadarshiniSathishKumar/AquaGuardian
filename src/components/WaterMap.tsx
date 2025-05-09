
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { regionsData, waterStressColors, RegionData } from '@/data/waterData';

const WaterMap = ({ onRegionSelect }: { onRegionSelect: (region: RegionData) => void }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  
  useEffect(() => {
    // Import leaflet dynamically to avoid SSR issues
    const loadMap = async () => {
      try {
        if (!mapContainerRef.current) return;
        
        const L = await import('leaflet');
        
        if (!mapRef.current) {
          // Initialize the map
          const map = L.map(mapContainerRef.current).setView([23.5937, 78.9629], 5);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);
          
          // Add markers for each region
          regionsData.forEach(region => {
            const markerColor = waterStressColors[region.waterStressLevel];
            
            const circleMarker = L.circleMarker(region.coordinates, {
              radius: 15,
              fillColor: markerColor,
              color: '#fff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            }).addTo(map);
            
            // Add a label
            const tooltip = L.tooltip({
              permanent: true,
              direction: 'center',
              className: 'region-label'
            }).setContent(region.name);
            
            circleMarker.bindTooltip(tooltip);
            
            // Add click handler
            circleMarker.on('click', () => {
              onRegionSelect(region);
            });
          });
          
          mapRef.current = map;
          setMapLoaded(true);
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };
    
    loadMap();
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onRegionSelect]);
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold">Water Stress Map</h2>
          <p className="text-sm text-gray-500">Click on a region to view detailed information</p>
        </div>
        <div className="h-[400px] w-full relative">
          <div ref={mapContainerRef} className="h-full w-full" />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-water border-r-transparent"></div>
                <p className="mt-2 text-sm">Loading map...</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-3 border-t">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-water-light mr-1"></div>
              <span>Low Stress</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-water mr-1"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-drought-light mr-1"></div>
              <span>High</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-drought mr-1"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-drought-dark mr-1"></div>
              <span>Emergency</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterMap;
