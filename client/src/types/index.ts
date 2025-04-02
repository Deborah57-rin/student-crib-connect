export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'owner';
    avatar?: string;
  }
  
  export interface Property {
    id: string;
    title: string;
    description: string;
    address: string;
    price: number;
    images: string[];
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    featured?: boolean;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Review {
    id: string;
    propertyId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }
  
  export interface Booking {
    id: string;
    propertyId: string;
    studentId: string;
    startDate: string;
    endDate: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
  }