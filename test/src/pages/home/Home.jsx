import React, {useState, useEffect} from "react";
import { Building, CheckCircle2, Home, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { PropertyGrid } from "../../components/propertyCard/PropertyGrid";
import { getProperties } from "../../APIs/userAPI";

const Index = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchProperties = async () => {
      try {
        const response = await getProperties();
        //setProperties(response);
        if(response.success){
          setProperties(response.properties);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-400 to-cyan-600 text-white bg-opacity-80">
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
                <Button title={'Browse Properties'} additionalStyles={'bg-blue-600 text-white hover:bg-opacity-90'}/>
                <Button title={'List Your Property'} additionalStyles={'bg-blue-400 border-[1px] border-white hover:bg-white hover:text-blue-600 transition duration-300'}/>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-10 mb-12">
          <SearchBar setProperties={setProperties} />
        </section>

        {/* Featured Properties */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Properties</h2>
              <p className="text-muted-foreground">Top-rated accommodations near campus</p>
            </div>
           <Button title={'View All'} additionalStyles={'bg-blue-500 text-white hover:bg-blue-600'}/>
          </div>
          
          {
            properties.length > 0 && <PropertyGrid properties={properties} />
          }
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
                <div className="bg-blue-400 bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-blue-400 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Search</h3>
                <p className="text-muted-foreground">
                  Browse our diverse selection of student-friendly apartments near your campus
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-400 bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-blue-400 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compare</h3>
                <p className="text-muted-foreground">
                  Compare properties based on price, amenities, reviews, and distance to campus
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-400 bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="text-blue-400 h-8 w-8" />
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
                className="w-full h-auto object-cover max-h-[350px]"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-400 to-cyan-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Are You a Property Owner?
              </h2>
              <p className="text-lg mb-8">
                List your property on Campus Crib Connect and connect with thousands of students looking for quality housing.
              </p>

              <Link to="/add-property" className="inline-flex items-center bg-white text-blue-500 px-6 py-3 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300">
                  <Building className="mr-2 h-5 w-5" />
                  List Your Property
                </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;