import React from "react";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ 
  properties, 
  columns = 3 
}) {
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