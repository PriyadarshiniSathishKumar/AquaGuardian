
export interface RegionData {
  id: string;
  name: string;
  waterStressLevel: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  waterAvailabilityPerCapita: number; // cubic meters per year
  groundwaterPercentage: number;
  surfaceWaterPercentage: number;
  averageRainfall: number; // mm per year
  agricultureUsage: number; // percentage
  industrialUsage: number; // percentage
  domesticUsage: number; // percentage
  coordinates: [number, number]; // [latitude, longitude]
}

export const waterStressColors = {
  low: '#E3F2FD',
  medium: '#1E88E5',
  high: '#FFECB3',
  critical: '#FF8F00',
  emergency: '#BF360C'
};

export const waterTips = {
  low: [
    "Install water-efficient fixtures to maintain good water levels",
    "Collect rainwater for garden use",
    "Fix leaky faucets promptly"
  ],
  medium: [
    "Take shorter showers (5 minutes or less)",
    "Install water-saving toilets or place a brick in your tank",
    "Water plants early morning or evening to reduce evaporation"
  ],
  high: [
    "Reuse greywater from laundry for toilets",
    "Use drought-resistant plants in landscaping",
    "Check for and fix household leaks immediately"
  ],
  critical: [
    "Limit outdoor water use to essential purposes only",
    "Use bucket instead of hose for car washing",
    "Install aerators on all faucets"
  ],
  emergency: [
    "Reduce shower time to 3 minutes maximum",
    "Consider dry cleaning methods where possible",
    "Report water waste in your community"
  ]
};

export const regionsData: RegionData[] = [
  {
    id: "IN-DL",
    name: "Delhi",
    waterStressLevel: "critical",
    waterAvailabilityPerCapita: 131,
    groundwaterPercentage: 80,
    surfaceWaterPercentage: 20,
    averageRainfall: 617,
    agricultureUsage: 30,
    industrialUsage: 30,
    domesticUsage: 40,
    coordinates: [28.7041, 77.1025]
  },
  {
    id: "IN-MH",
    name: "Maharashtra",
    waterStressLevel: "high",
    waterAvailabilityPerCapita: 275,
    groundwaterPercentage: 60,
    surfaceWaterPercentage: 40,
    averageRainfall: 882,
    agricultureUsage: 65,
    industrialUsage: 15,
    domesticUsage: 20,
    coordinates: [19.7515, 75.7139]
  },
  {
    id: "IN-KA",
    name: "Karnataka",
    waterStressLevel: "medium",
    waterAvailabilityPerCapita: 450,
    groundwaterPercentage: 50,
    surfaceWaterPercentage: 50,
    averageRainfall: 1248,
    agricultureUsage: 70,
    industrialUsage: 12,
    domesticUsage: 18,
    coordinates: [15.3173, 75.7139]
  },
  {
    id: "IN-KL",
    name: "Kerala",
    waterStressLevel: "low",
    waterAvailabilityPerCapita: 2500,
    groundwaterPercentage: 40,
    surfaceWaterPercentage: 60,
    averageRainfall: 3055,
    agricultureUsage: 60,
    industrialUsage: 12,
    domesticUsage: 28,
    coordinates: [10.8505, 76.2711]
  },
  {
    id: "IN-RJ",
    name: "Rajasthan",
    waterStressLevel: "emergency",
    waterAvailabilityPerCapita: 110,
    groundwaterPercentage: 90,
    surfaceWaterPercentage: 10,
    averageRainfall: 325,
    agricultureUsage: 83,
    industrialUsage: 7,
    domesticUsage: 10,
    coordinates: [27.0238, 74.2179]
  },
  {
    id: "IN-UP",
    name: "Uttar Pradesh",
    waterStressLevel: "high",
    waterAvailabilityPerCapita: 320,
    groundwaterPercentage: 70,
    surfaceWaterPercentage: 30,
    averageRainfall: 950,
    agricultureUsage: 75,
    industrialUsage: 8,
    domesticUsage: 17,
    coordinates: [26.8467, 80.9462]
  },
  {
    id: "IN-GJ",
    name: "Gujarat",
    waterStressLevel: "high",
    waterAvailabilityPerCapita: 350,
    groundwaterPercentage: 65,
    surfaceWaterPercentage: 35,
    averageRainfall: 810,
    agricultureUsage: 76,
    industrialUsage: 14,
    domesticUsage: 10,
    coordinates: [22.2587, 71.1924]
  },
  {
    id: "IN-TN",
    name: "Tamil Nadu",
    waterStressLevel: "high",
    waterAvailabilityPerCapita: 410,
    groundwaterPercentage: 55,
    surfaceWaterPercentage: 45,
    averageRainfall: 945,
    agricultureUsage: 75,
    industrialUsage: 10,
    domesticUsage: 15,
    coordinates: [11.1271, 78.6569]
  }
];

export const waterUsageActivities = [
  { id: "shower", name: "Shower", litersPerMinute: 15, averageDurationMinutes: 8 },
  { id: "bath", name: "Bath", litersPerUse: 80 },
  { id: "toilet", name: "Toilet Flush", litersPerUse: 6 },
  { id: "teeth", name: "Brushing Teeth", litersPerMinute: 6, averageDurationMinutes: 3 },
  { id: "dishwasher", name: "Dishwasher", litersPerLoad: 15 },
  { id: "handwash", name: "Hand Washing Dishes", litersPerMinute: 8, averageDurationMinutes: 8 },
  { id: "laundry", name: "Laundry", litersPerLoad: 70 },
  { id: "drinking", name: "Drinking & Cooking", litersPerPerson: 5 },
  { id: "garden", name: "Garden/Plants", litersPerMinute: 12, typicalMinutesWeek: 30 }
];

// National averages
export const nationalAverages = {
  perPersonDaily: 135, // liters per person per day
  perHouseholdMonthly: 12000 // liters per household per month
};
