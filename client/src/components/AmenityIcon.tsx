import React from "react";
import { 
  Wifi, 
  Car, 
  AirVent, 
  Utensils, 
  Dumbbell, 
  Snowflake, 
  Shirt, 
  LampDesk,
  Circle,
  Flame,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AmenityIconProps {
  amenity: string;
  className?: string;
  size?: number;
}

export function AmenityIcon({ amenity, className, size = 18 }: AmenityIconProps) {
  const amenityMap: Record<string, LucideIcon> = {
    "WiFi": Wifi,
    "Parking": Car,
    "Air Conditioning": AirVent,
    "Dishwasher": Utensils,
    "Gym Access": Dumbbell,
    "Laundry": Shirt,
    "Study Desk": LampDesk,
    "Balcony": Circle,
    "Heating": Flame,
    "Street Parking": Car,
  };

  const Icon = amenityMap[amenity] || Circle;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon size={size} className="text-campus-blue" />
      <span>{amenity}</span>
    </div>
  );
}