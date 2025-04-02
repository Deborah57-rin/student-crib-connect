import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { AmenityIcon } from "@/components/AmenityIcon";
import { mockProperties, mockReviews, mockUsers } from "@/data/mockData";
//import { PriceTag } from "@/components/ui/price-tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bed, 
  Bath, 
  MapPin,
  Heart, 
  Share,
  Star,
  Info,
  Calendar as CalendarIcon,
  User,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { PriceTag } from "@/components/ui/price-tag";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Find the property by ID
  const property = mockProperties.find(p => p.id === id);
  const reviews = mockReviews.filter(r => r.propertyId === id);
  
  // If property not found, show error
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
            <p className="text-muted-foreground mb-4">The property you're looking for doesn't exist.</p>
            <Button asChild>
              <a href="/properties">Back to Properties</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find the owner
  const owner = mockUsers.find(u => u.id === property.ownerId);

  // Function to navigate images
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        {/* Image Gallery */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100">
          <img 
            src={property.images[currentImageIndex]} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          
          {property.images.length > 1 && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                onClick={prevImage}
              >
                <ArrowLeft size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                onClick={nextImage}
              >
                <ArrowRight size={20} />
              </Button>
            </>
          )}

          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/80 hover:bg-white rounded-full"
            >
              <Heart size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/80 hover:bg-white rounded-full"
            >
              <Share size={20} />
            </Button>
          </div>
          
          {/* Image indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin size={16} className="mr-1" />
                      {property.address}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Bed size={18} className="mr-1 text-primary" />
                        <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath size={18} className="mr-1 text-primary" />
                        <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                      </div>
                    </div>
                  </div>
                  <PriceTag price={property.price} size="lg" />
                </div>

                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <h2 className="text-xl font-semibold">About this property</h2>
                    <p className="text-muted-foreground">{property.description}</p>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Type</span>
                          <span className="font-medium">Apartment</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Bedrooms</span>
                          <span className="font-medium">{property.bedrooms}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Bathrooms</span>
                          <span className="font-medium">{property.bathrooms}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Available from</span>
                          <span className="font-medium">Immediately</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Lease term</span>
                          <span className="font-medium">12 months</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Pet policy</span>
                          <span className="font-medium">No pets</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Location</h3>
                      <div className="h-64 bg-gray-200 rounded-md">
                        {/* Map placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Interactive map would be displayed here
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities">
                    <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <AmenityIcon 
                          key={index} 
                          amenity={amenity} 
                          size={20}
                          className="bg-gray-50 p-3 rounded-md"
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Student Reviews</h2>
                      <p className="text-muted-foreground mb-4">
                        Read what other students have to say about this property
                      </p>
                      
                      {reviews.length > 0 ? (
                        <div className="space-y-6 mt-4">
                          {reviews.map((review) => {
                            const reviewer = mockUsers.find(u => u.id === review.userId);
                            return (
                              <div key={review.id} className="border-b pb-6 last:border-0">
                                <div className="flex items-start gap-4">
                                  <Avatar>
                                    <AvatarImage src={reviewer?.avatar} alt={reviewer?.name} />
                                    <AvatarFallback>{reviewer?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                      <h4 className="font-semibold">{reviewer?.name}</h4>
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            size={16}
                                            className={i < review.rating ? "fill-campus-gold text-campus-gold" : "text-gray-300"}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <p className="text-muted-foreground">{review.comment}</p>
                                    <div className="text-xs text-muted-foreground mt-2">
                                      {new Date(review.createdAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-6 border rounded-md">
                          <Info size={24} className="mx-auto mb-2 text-muted-foreground" />
                          <p>No reviews yet for this property.</p>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <Button>Leave a Review</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Book a Viewing</h2>
                
                <div className="mb-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Reserve for Viewing</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Your Viewing</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="mb-4">
                        You're booking a viewing for:
                      </p>
                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <CalendarIcon size={14} />
                          <span>{date?.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The property owner will contact you to confirm the exact time.
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" className="w-full">Cancel</Button>
                      <Button className="w-full">Confirm</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {owner && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Owner</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={owner.avatar} alt={owner.name} />
                      <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{owner.name}</h3>
                      <p className="text-sm text-muted-foreground">Property Owner</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Contact Owner
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;