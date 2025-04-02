import { Property, Review, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Sarah Owner',
    email: 'sarah@example.com',
    role: 'owner',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Studio Near Campus',
    description: 'A beautiful studio apartment within walking distance to campus, perfect for students.',
    address: '123 College Ave, University City',
    price: 850,
    images: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800',
    ],
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Air Conditioning', 'Laundry', 'Parking'],
    featured: true,
    ownerId: '2',
    createdAt: '2023-05-10T10:30:00Z',
    updatedAt: '2023-05-10T10:30:00Z',
  },
  {
    id: '2',
    title: 'Spacious 2BD with Balcony',
    description: 'Large 2 bedroom apartment with a beautiful balcony overlooking the park. Perfect for roommates.',
    address: '456 University Blvd, University Heights',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800',
    ],
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Balcony', 'Dishwasher', 'Gym Access'],
    featured: true,
    ownerId: '2',
    createdAt: '2023-06-15T14:20:00Z',
    updatedAt: '2023-07-01T09:15:00Z',
  },
  {
    id: '3',
    title: 'Cozy 1BD Apartment',
    description: 'Comfortable 1 bedroom apartment in a quiet neighborhood, just a short bus ride from campus.',
    address: '789 Scholar St, College Park',
    price: 900,
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800',
    ],
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Heating', 'Study Desk', 'Street Parking'],
    ownerId: '2',
    createdAt: '2023-06-20T11:45:00Z',
    updatedAt: '2023-06-20T11:45:00Z',
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    propertyId: '1',
    userId: '1',
    rating: 4,
    comment: 'Great place, close to campus and very clean!',
    createdAt: '2023-07-15T09:30:00Z',
  },
  {
    id: '2',
    propertyId: '2',
    userId: '1',
    rating: 5,
    comment: 'Amazing apartment with a beautiful view. The roommate and I love it here!',
    createdAt: '2023-08-01T16:45:00Z',
  },
];

export const currentUser: User = mockUsers[0]; // Default to first user (student)