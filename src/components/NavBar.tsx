
import React from 'react';
import { Droplet } from 'lucide-react';
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="water-ripple-container h-10 w-10 flex items-center justify-center rounded-full bg-water-light">
          <Droplet className="h-6 w-6 text-water-dark z-10" />
          <div className="water-ripple-effect"></div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">AquaGuardian</h1>
          <p className="text-xs text-gray-500">Water Scarcity Visualizer</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">About</Button>
        <Button variant="outline" size="sm">Resources</Button>
      </div>
    </div>
  );
};

export default NavBar;
