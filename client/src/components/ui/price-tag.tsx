import React from "react";
import { cn } from "@/lib/utils";

interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  period?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceTag({
  price,
  period = "month",
  size = "md",
  className,
  ...props
}: PriceTagProps) {
  const sizeClasses = {
    sm: "text-lg font-semibold",
    md: "text-xl font-bold",
    lg: "text-2xl font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-baseline text-primary",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="mr-1">$</span>
      <span>{price}</span>
      {period && (
        <span className="ml-1 text-muted-foreground text-sm font-normal">
          /{period}
        </span>
      )}
    </div>
  );
}
