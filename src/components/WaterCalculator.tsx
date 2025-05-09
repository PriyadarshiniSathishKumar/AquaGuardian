
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { waterUsageActivities, nationalAverages, RegionData, waterTips } from '@/data/waterData';
import { Progress } from "@/components/ui/progress";

interface WaterUsage {
  [key: string]: number;
}

type WaterCalculatorProps = {
  selectedRegion: RegionData | null;
}

const WaterCalculator: React.FC<WaterCalculatorProps> = ({ selectedRegion }) => {
  const [familySize, setFamilySize] = useState(4);
  const [waterUsage, setWaterUsage] = useState<WaterUsage>({
    showerMinutes: 8,
    bathsPerWeek: 2,
    toiletFlushesPerDay: 5,
    teethBrushingMinutes: 4,
    dishwasherLoadsPerWeek: 4,
    dishWashingMinutes: 10,
    laundryLoadsPerWeek: 3,
    gardeningMinutes: 20
  });
  
  const [totalUsage, setTotalUsage] = useState(0);
  const [comparisonPercentage, setComparisonPercentage] = useState(0);
  const [waterTipsList, setWaterTipsList] = useState<string[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWaterUsage(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setWaterUsage(prev => ({ ...prev, [name]: value[0] }));
  };
  
  const calculateDailyUsage = () => {
    const { 
      showerMinutes, 
      bathsPerWeek, 
      toiletFlushesPerDay, 
      teethBrushingMinutes, 
      dishwasherLoadsPerWeek, 
      dishWashingMinutes, 
      laundryLoadsPerWeek, 
      gardeningMinutes 
    } = waterUsage;
    
    // Calculate daily water usage in liters
    const showerWater = 15 * showerMinutes * familySize; // 15L per minute
    const bathWater = (80 * bathsPerWeek * familySize) / 7; // 80L per bath, converted to daily
    const toiletWater = 6 * toiletFlushesPerDay * familySize; // 6L per flush
    const teethWater = 6 * teethBrushingMinutes * familySize; // 6L per minute
    const dishwasherWater = (15 * dishwasherLoadsPerWeek) / 7; // 15L per load, converted to daily
    const dishWashingWater = (8 * dishWashingMinutes * dishwasherLoadsPerWeek) / 7; // 8L per minute, converted to daily
    const laundryWater = (70 * laundryLoadsPerWeek) / 7; // 70L per load, converted to daily
    const gardeningWater = (12 * gardeningMinutes) / 7; // 12L per minute, converted to daily
    const drinkingWater = 5 * familySize; // 5L per person for drinking and cooking
    
    const total = showerWater + bathWater + toiletWater + teethWater + 
                 dishwasherWater + dishWashingWater + laundryWater + 
                 gardeningWater + drinkingWater;
    
    setTotalUsage(Math.round(total));
    
    // Compare to national average (per person)
    const perPersonUsage = total / familySize;
    const nationalAverage = nationalAverages.perPersonDaily;
    const percentage = Math.round((perPersonUsage / nationalAverage) * 100);
    setComparisonPercentage(percentage);
    
    // Set water tips based on selected region or general tips if no region selected
    if (selectedRegion) {
      setWaterTipsList(waterTips[selectedRegion.waterStressLevel]);
    } else {
      // Default to medium water stress tips if no region selected
      setWaterTipsList(waterTips.medium);
    }
  };
  
  // Recalculate when inputs change
  useEffect(() => {
    calculateDailyUsage();
  }, [waterUsage, familySize, selectedRegion]);
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold">Water Footprint Calculator</h2>
          <p className="text-sm text-gray-500">Calculate your household's daily water usage</p>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="familySize">Family Size</Label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFamilySize(prev => Math.max(1, prev - 1))}
                >-</Button>
                <span className="w-8 text-center">{familySize}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFamilySize(prev => prev + 1)}
                >+</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="showerMinutes">Shower Minutes (per person)</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[waterUsage.showerMinutes]}
                    onValueChange={(value) => handleSliderChange("showerMinutes", value)}
                    min={1}
                    max={20}
                    step={1}
                    className="w-3/4"
                  />
                  <Input
                    id="showerMinutes"
                    name="showerMinutes"
                    type="number"
                    min={0}
                    className="w-1/4"
                    value={waterUsage.showerMinutes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bathsPerWeek">Baths (per week per person)</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[waterUsage.bathsPerWeek]}
                    onValueChange={(value) => handleSliderChange("bathsPerWeek", value)}
                    min={0}
                    max={7}
                    step={1}
                    className="w-3/4"
                  />
                  <Input
                    id="bathsPerWeek"
                    name="bathsPerWeek"
                    type="number"
                    min={0}
                    className="w-1/4"
                    value={waterUsage.bathsPerWeek}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="toiletFlushesPerDay">Toilet Flushes (per day per person)</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[waterUsage.toiletFlushesPerDay]}
                    onValueChange={(value) => handleSliderChange("toiletFlushesPerDay", value)}
                    min={1}
                    max={10}
                    step={1}
                    className="w-3/4"
                  />
                  <Input
                    id="toiletFlushesPerDay"
                    name="toiletFlushesPerDay"
                    type="number"
                    min={0}
                    className="w-1/4"
                    value={waterUsage.toiletFlushesPerDay}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="laundryLoadsPerWeek">Laundry Loads (per week)</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[waterUsage.laundryLoadsPerWeek]}
                    onValueChange={(value) => handleSliderChange("laundryLoadsPerWeek", value)}
                    min={0}
                    max={10}
                    step={1}
                    className="w-3/4"
                  />
                  <Input
                    id="laundryLoadsPerWeek"
                    name="laundryLoadsPerWeek"
                    type="number"
                    min={0}
                    className="w-1/4"
                    value={waterUsage.laundryLoadsPerWeek}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="gardeningMinutes">Gardening Minutes (per week)</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[waterUsage.gardeningMinutes]}
                    onValueChange={(value) => handleSliderChange("gardeningMinutes", value)}
                    min={0}
                    max={60}
                    step={5}
                    className="w-3/4"
                  />
                  <Input
                    id="gardeningMinutes"
                    name="gardeningMinutes"
                    type="number"
                    min={0}
                    className="w-1/4"
                    value={waterUsage.gardeningMinutes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Your Daily Water Usage</h3>
                <span className="text-xl font-bold">{totalUsage} L</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Per person</span>
                  <span>{Math.round(totalUsage / familySize)} L/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Compared to national average</span>
                  <span className={`text-sm font-medium ${comparisonPercentage > 100 ? 'text-drought' : 'text-water'}`}>
                    {comparisonPercentage}%
                  </span>
                </div>
                <Progress 
                  value={comparisonPercentage} 
                  max={200}
                  className="h-2 mt-1"
                />
              </div>
            </div>
            
            {/* Water conservation tips */}
            <div className="mt-2 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-water-dark mb-2">
                Water Conservation Tips {selectedRegion ? `for ${selectedRegion.name}` : ''}
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {waterTipsList.map((tip, index) => (
                  <li key={index} className="text-sm">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterCalculator;
