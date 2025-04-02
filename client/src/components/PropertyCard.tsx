import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Property } from "@/types";
//import { PropertyBadge } from "@/components/ui/property-badge";
//import { PriceTag } from "@/components/ui/price-tag";
import { AmenityIcon } from "@/components/AmenityIcon";
import { Bed, Bath, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { PropertyBadge } from "./ui/property-badge";
import { PriceTag } from "./ui/price-tag";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="overflow-hidden property-card">
      <Link to={`/properties/${property.id}`}>
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={property.images[0]}
              alt={property.title}
              className="object-cover w-full h-full rounded-t-md"
            />
          </AspectRatio>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
            onClick={toggleFavorite}
          >
            <Heart
              className={isFavorite ? "fill-campus-red text-campus-red" : "text-gray-600"}
              size={20}
            />
          </Button>
          {property.featured && (
            <div className="absolute top-2 left-2">
              <PropertyBadge variant="featured" />
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <MapPin size={14} className="mr-1" />
          {property.address}
        </div>
        <Link to={`/properties/${property.id}`} className="no-underline">
          <h3 className="text-xl font-semibold mb-2 text-foreground hover:text-primary">
            {property.title}
          </h3>
        </Link>
        <PriceTag price={property.price} className="mb-3" />
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <div className="grid grid-cols-2 gap-2">
            {property.amenities.slice(0, 4).map((amenity, index) => (
              <AmenityIcon key={index} amenity={amenity} />
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end p-4 pt-0">
        <Link to={`/properties/${property.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}