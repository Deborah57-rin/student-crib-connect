import React from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { PropertyGrid } from "@/components/PropertyGrid";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { mockProperties } from "@/data/mockData";
import { Building, CheckCircle2, Home, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredProperties = mockProperties.filter(property => property.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-campus-blue text-white">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600" 
              alt="Campus apartments" 
              className="object-cover w-full h-full opacity-20"
            />
          </div>
          <div className="hero-gradient absolute inset-0"></div>
          <div className="relative container mx-auto px-4 py-20 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Find Your Perfect Campus Housing
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Discover quality apartments and housing options near your campus. 
                Student-friendly, affordable, and hassle-free.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/properties">Browse Properties</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10" asChild>
                  <Link to="/add-property">List Your Property</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-10 mb-12">
          <SearchBar />
        </section>

        {/* Featured Properties */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Properties</h2>
              <p className="text-muted-foreground">Top-rated accommodations near campus</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/properties">View All</Link>
            </Button>
          </div>
          
          <PropertyGrid properties={featuredProperties} />
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Finding the perfect student housing near your campus has never been easier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Search</h3>
                <p className="text-muted-foreground">
                  Browse our diverse selection of student-friendly apartments near your campus
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compare</h3>
                <p className="text-muted-foreground">
                  Compare properties based on price, amenities, reviews, and distance to campus
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Book</h3>
                <p className="text-muted-foreground">
                  Contact property owners directly and book your perfect student accommodation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Why Students Love Campus Crib Connect
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-campus-green mr-3 h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Verified Properties</h3>
                    <p className="text-muted-foreground">All properties are verified for quality and safety standards</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-campus-green mr-3 h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Student Reviews</h3>
                    <p className="text-muted-foreground">Real reviews from students who have lived there before</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-campus-green mr-3 h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Campus Proximity</h3>
                    <p className="text-muted-foreground">All properties within reasonable distance to campus</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-campus-green mr-3 h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Secure Booking</h3>
                    <p className="text-muted-foreground">Secure and transparent booking process</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800"
                alt="Student apartment living room" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-campus-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Are You a Property Owner?
              </h2>
              <p className="text-lg mb-8">
                List your property on Campus Crib Connect and connect with thousands of students looking for quality housing.
              </p>
              <Button size="lg" variant="outline" className="bg-white text-campus-blue hover:bg-white/90 hover:text-campus-blue" asChild>
                <Link to="/add-property">
                  <Building className="mr-2 h-5 w-5" />
                  List Your Property
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;