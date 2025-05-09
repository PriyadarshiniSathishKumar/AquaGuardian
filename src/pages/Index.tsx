
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import WaterMap from '@/components/WaterMap';
import RegionDetail from '@/components/RegionDetail';
import WaterCalculator from '@/components/WaterCalculator';
import { RegionData } from '@/data/waterData';
import { Droplet } from 'lucide-react';

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const handleRegionSelect = (region: RegionData) => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="container py-6 px-4">
        {/* Hero section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">AquaGuardian</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understand water scarcity in your region and learn how to protect this valuable resource
          </p>
        </div>

        {/* Water stress map section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WaterMap onRegionSelect={handleRegionSelect} />
            <RegionDetail region={selectedRegion} />
          </div>
        </section>

        {/* Water calculator */}
        <section className="mb-12">
          <WaterCalculator selectedRegion={selectedRegion} />
        </section>

        {/* Information section */}
        <section className="mb-12 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Water Conservation Matters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4">
              <div className="water-ripple-container mx-auto h-16 w-16 bg-water-light rounded-full flex items-center justify-center mb-4">
                <Droplet className="h-8 w-8 text-water-dark z-10" />
                <div className="water-ripple-effect"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Water Scarcity</h3>
              <p className="text-gray-600">More than 2 billion people live in countries experiencing high water stress, and about 4 billion people experience severe water scarcity at least one month a year.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="water-ripple-container mx-auto h-16 w-16 bg-water-light rounded-full flex items-center justify-center mb-4">
                <Droplet className="h-8 w-8 text-water-dark z-10" />
                <div className="water-ripple-effect"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Agriculture Impact</h3>
              <p className="text-gray-600">Agriculture accounts for 70% of global freshwater withdrawals. Sustainable water management can help ensure food security for growing populations.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="water-ripple-container mx-auto h-16 w-16 bg-water-light rounded-full flex items-center justify-center mb-4">
                <Droplet className="h-8 w-8 text-water-dark z-10" />
                <div className="water-ripple-effect"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Action</h3>
              <p className="text-gray-600">Local communities can make a significant difference through conservation efforts, rainwater harvesting, and supporting water-friendly policies.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Droplet className="h-6 w-6 mr-2 text-blue-400" />
                <span className="font-semibold text-xl">AquaGuardian</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">Water Scarcity Visualizer</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                Data sources: India Water Resources Info System, FAO AQUASTAT
              </p>
              <p className="text-sm text-gray-400 mt-1">
                © 2025 AquaGuardian Project
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
