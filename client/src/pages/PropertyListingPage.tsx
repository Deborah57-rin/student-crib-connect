import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyGrid } from "@/components/PropertyGrid";
import { SearchBar } from "@/components/SearchBar";
import { mockProperties } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";

const PropertyListingPage = () => {
  const [properties] = useState(mockProperties);
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
            <p className="text-muted-foreground">
              Find your perfect student accommodation near campus
            </p>
          </div>

          <div className="mb-6">
            <SearchBar />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter sidebar - hidden on mobile until toggled */}
            <aside className={`w-full lg:w-64 shrink-0 ${filtersVisible ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Price Range</Label>
                    <div className="space-y-4">
                      <Slider defaultValue={[0, 2000]} min={0} max={3000} step={100} />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$0</span>
                        <span>$3000+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Property Type</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="apartment" />
                        <label htmlFor="apartment" className="text-sm">Apartment</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="house" />
                        <label htmlFor="house" className="text-sm">House</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="studio" />
                        <label htmlFor="studio" className="text-sm">Studio</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dormitory" />
                        <label htmlFor="dormitory" className="text-sm">Dormitory</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Bedrooms</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="any-bed" />
                        <label htmlFor="any-bed" className="text-sm">Any</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="1-bed" />
                        <label htmlFor="1-bed" className="text-sm">1 Bedroom</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="2-bed" />
                        <label htmlFor="2-bed" className="text-sm">2 Bedrooms</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="3-bed" />
                        <label htmlFor="3-bed" className="text-sm">3+ Bedrooms</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Amenities</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wifi" />
                        <label htmlFor="wifi" className="text-sm">WiFi</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="laundry" />
                        <label htmlFor="laundry" className="text-sm">Laundry</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="parking" />
                        <label htmlFor="parking" className="text-sm">Parking</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ac" />
                        <label htmlFor="ac" className="text-sm">Air Conditioning</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gym" />
                        <label htmlFor="gym" className="text-sm">Gym Access</label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </aside>

            {/* Property listings */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                  <div>
                    <p className="text-muted-foreground">
                      {properties.length} properties found
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Button 
                      variant="outline" 
                      className="lg:hidden w-full sm:w-auto"
                      onClick={() => setFiltersVisible(!filtersVisible)}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <Select defaultValue="recommended">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recommended">Recommended</SelectItem>
                          <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                          <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <PropertyGrid properties={properties} columns={3} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyListingPage;