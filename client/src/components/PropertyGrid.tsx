import React from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/types";

interface PropertyGridProps {
  properties: Property[];
  columns?: 1 | 2 | 3 | 4;
}

export function PropertyGrid({ 
  properties, 
  columns = 3 
}: PropertyGridProps) {
  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  return (
    <div className={`grid ${gridColsClass[columns]} gap-6`}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}