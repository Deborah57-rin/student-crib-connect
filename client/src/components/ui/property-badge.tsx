import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PropertyBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "featured" | "new" | "popular";
}

export function PropertyBadge({
  variant = "featured",
  className,
  ...props
}: PropertyBadgeProps) {
  const variantClasses = {
    featured: "bg-campus-blue text-white hover:bg-campus-lightBlue",
    new: "bg-campus-green text-white hover:bg-campus-green/90",
    popular: "bg-campus-gold text-black hover:bg-campus-gold/90",
  };

  const variantText = {
    featured: "Featured",
    new: "New",
    popular: "Popular",
  };

  return (
    <Badge
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {variantText[variant]}
    </Badge>
  );
}