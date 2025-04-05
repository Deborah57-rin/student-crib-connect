
  export const mockProperties = [
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
    // Additional properties...
    {
      id: '4',
      title: 'Luxury Penthouse with City View',
      description: 'Stunning penthouse with panoramic city views, perfect for those who want luxury living.',
      address: '101 Skyline Dr, Downtown',
      price: 2500,
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800',
      ],
      bedrooms: 3,
      bathrooms: 2,
      amenities: ['WiFi', 'Pool', 'Gym', 'Parking', 'Concierge'],
      featured: true,
      ownerId: '4',
      createdAt: '2023-04-05T08:15:00Z',
      updatedAt: '2023-04-20T12:30:00Z',
    },
    {
      id: '5',
      title: 'Affordable Shared Room',
      description: 'Budget-friendly shared room in a house with other students, great for making friends.',
      address: '202 Campus Rd, Student Village',
      price: 500,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800',
        'https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&fit=crop&w=800',
      ],
      bedrooms: 1,
      bathrooms: 1,
      amenities: ['WiFi', 'Shared Kitchen', 'Laundry', 'Common Area'],
      ownerId: '7',
      createdAt: '2023-07-10T13:45:00Z',
      updatedAt: '2023-07-10T13:45:00Z',
    },
    // Continue adding more properties up to 15...
  ];
  
  export const mockReviews = [
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
    // Additional reviews...
    {
      id: '3',
      propertyId: '1',
      userId: '3',
      rating: 5,
      comment: 'Perfect location and the landlord is very responsive to maintenance requests.',
      createdAt: '2023-08-10T14:20:00Z',
    },
    {
      id: '4',
      propertyId: '3',
      userId: '5',
      rating: 3,
      comment: 'Good value for the price, but the walls are a bit thin.',
      createdAt: '2023-08-15T11:10:00Z',
    },
    {
      id: '5',
      propertyId: '2',
      userId: '6',
      rating: 4,
      comment: 'Great amenities and spacious rooms. Would recommend!',
      createdAt: '2023-08-20T17:30:00Z',
    },
    {
      id: '6',
      propertyId: '4',
      userId: '8',
      rating: 5,
      comment: 'Absolutely stunning views and top-notch facilities. Worth every penny!',
      createdAt: '2023-09-05T10:15:00Z',
    },
    // Continue adding more reviews up to 30...
  ];


  export const ALL_AMENITIES = [
    // Basic Utilities
    'Electricity Included',
    'Water Included',
    'Trash Removal',
    
    // Internet & Communication
    'WiFi',
    'Laundry Service',
    
    // Heating/Cooling
    'Air Conditioning',
    'Ceiling Fans',
    'Shower',
    
    // Outdoor & Parking
    'Balcony',
    'Parking',

    
    // Building Amenities
    'Elevator',
    'Wheelchair Access',
    'Security System',
    'Gated Community',
    'Package Receiving',
    'Doorman',
  
    
    // Community Spaces
    'Roof Deck',
    'Lounge',
    'Game Room',
    'Party Room',
    
    // Pet Related
    'Pet Friendly',
    
    // Safety Features
    'Smoke Detectors',
    'Fire Extinguisher',
  ];
  