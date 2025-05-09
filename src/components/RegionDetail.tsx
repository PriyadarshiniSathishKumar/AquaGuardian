
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RegionData, waterStressColors } from '@/data/waterData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RegionDetail = ({ region }: { region: RegionData | null }) => {
  if (!region) {
    return (
      <Card className="shadow-md h-[400px]">
        <CardContent className="p-6 h-full flex items-center justify-center text-center">
          <div>
            <h3 className="text-lg font-medium mb-2">Select a Region</h3>
            <p className="text-muted-foreground">Click on any region on the map to view detailed information</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const waterSourceData = [
    { name: 'Groundwater', value: region.groundwaterPercentage },
    { name: 'Surface Water', value: region.surfaceWaterPercentage },
  ];

  const usageData = [
    { name: 'Agriculture', value: region.agricultureUsage },
    { name: 'Industrial', value: region.industrialUsage },
    { name: 'Domestic', value: region.domesticUsage },
  ];

  // Sample data for monthly rainfall/usage chart
  const monthlyData = [
    { month: 'Jan', rainfall: region.averageRainfall/12 * (Math.random() * 0.4 + 0.8), usage: region.waterAvailabilityPerCapita/12 * (Math.random() * 0.3 + 0.9) },
    { month: 'Feb', rainfall: region.averageRainfall/12 * (Math.random() * 0.4 + 0.8), usage: region.waterAvailabilityPerCapita/12 * (Math.random() * 0.3 + 0.9) },
    { month: 'Mar', rainfall: region.averageRainfall/12 * (Math.random() * 0.4 + 0.8), usage: region.waterAvailabilityPerCapita/12 * (Math.random() * 0.3 + 0.9) },
    { month: 'Apr', rainfall: region.averageRainfall/12 * (Math.random() * 0.4 + 0.8), usage: region.waterAvailabilityPerCapita/12 * (Math.random() * 0.3 + 0.9) },
    { month: 'May', rainfall: region.averageRainfall/12 * (Math.random() * 0.4 + 0.8), usage: region.waterAvailabilityPerCapita/12 * (Math.random() * 0.3 + 0.9) },
    { month: 'Jun', rainfall: region.averageRainfall/12 * (Math.random() * 0.4 + 0.8), usage: region.waterAvailabilityPerCapita/12 * (Math.random() * 0.3 + 0.9) },
  ];

  const stressColor = waterStressColors[region.waterStressLevel];
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{region.name} Region</h2>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: stressColor }}></div>
              <span className="text-sm capitalize">{region.waterStressLevel} Water Stress</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Water Availability</h3>
              <p className="text-2xl font-semibold">{region.waterAvailabilityPerCapita} m³</p>
              <p className="text-xs text-gray-500">Per capita per year</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Average Annual Rainfall</h3>
              <p className="text-2xl font-semibold">{region.averageRainfall} mm</p>
            </div>

            {/* Water sources pie chart */}
            <div>
              <h3 className="text-sm font-medium mb-2">Water Sources</h3>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={waterSourceData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={40}
                      outerRadius={60} 
                      fill="#8884d8" 
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell key="cell-0" fill="#1E88E5" />
                      <Cell key="cell-1" fill="#90CAF9" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Usage breakdown */}
            <div>
              <h3 className="text-sm font-medium mb-2">Water Usage</h3>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={usageData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={40}
                      outerRadius={60} 
                      fill="#8884d8" 
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell key="cell-0" fill="#43A047" />
                      <Cell key="cell-1" fill="#FF8F00" />
                      <Cell key="cell-2" fill="#1E88E5" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Rainfall vs Usage chart */}
            <div>
              <h3 className="text-sm font-medium mb-2">Rainfall vs. Usage (6 Months)</h3>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <XAxis dataKey="month" tick={{fontSize: 10}} />
                    <YAxis tick={{fontSize: 10}} />
                    <Tooltip />
                    <Area type="monotone" dataKey="rainfall" stackId="1" stroke="#1E88E5" fill="#90CAF9" name="Rainfall" />
                    <Area type="monotone" dataKey="usage" stackId="2" stroke="#FF8F00" fill="#FFCC80" name="Usage" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionDetail;
