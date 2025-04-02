import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row gap-3 w-full max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex-1 relative">
        <Input 
          placeholder="Location, property name, or address" 
          className="w-full pl-10" 
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Price</SelectItem>
            <SelectItem value="0-500">$0 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1000</SelectItem>
            <SelectItem value="1000-1500">$1000 - $1500</SelectItem>
            <SelectItem value="1500+">$1500+</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Beds" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+ Beds</SelectItem>
            <SelectItem value="2">2+ Beds</SelectItem>
            <SelectItem value="3">3+ Beds</SelectItem>
            <SelectItem value="4">4+ Beds</SelectItem>
          </SelectContent>
        </Select>

        <Button className="col-span-2 md:col-span-1">Search</Button>
      </div>
    </div>
  );
}