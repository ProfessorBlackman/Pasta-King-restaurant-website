
import { Category, MenuItem, Testimonial, GalleryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Jollof Spaghetti Supreme',
    price: 85,
    description: 'Spicy tomato sauce base, grilled chicken chunks, mixed peppers, and green peas. A local favorite with an Italian twist.',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800',
    category: Category.CHEFS_SPECIALS,
    tags: ['Popular', 'Spicy', 'Top Rated']
  },
  {
    id: '2',
    name: 'Creamy Shito Penne',
    price: 120,
    description: 'Rich cream sauce infused with spicy black pepper shito sauce and grilled king prawns.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800',
    category: Category.CHEFS_SPECIALS,
    tags: ['Spicy', 'Chef Choice']
  },
  {
    id: '3',
    name: 'Classic Carbonara',
    price: 95,
    description: 'Authentic Italian style with egg yolk, parmesan cheese, and cured guanciale.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
    category: Category.MEAT_LOVERS,
    tags: ['Authentic']
  },
  {
    id: '4',
    name: 'Basil Pesto Delight',
    price: 70,
    description: 'Fresh basil pesto with pine nuts, garlic, and extra virgin olive oil topped with parmesan.',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    category: Category.VEGETARIAN,
    tags: ['Healthy']
  },
  {
    id: '5',
    name: 'Spicy Seafood Linguine',
    price: 135,
    description: 'Linguine pasta with calamari, mussels, and shrimp in a spicy scotch bonnet tomato broth.',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800',
    category: Category.SEAFOOD,
    tags: ['Premium']
  },
  {
    id: '6',
    name: 'Beef Lasagna',
    price: 95,
    description: 'Layers of pasta sheets, rich meat sauce, béchamel, and melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
    category: Category.MEAT_LOVERS
  },
  {
    id: '7',
    name: 'Garden Veggie Fusilli',
    price: 65,
    description: 'Seasonal Ghanaian vegetables sautéed in garlic and olive oil with spiral pasta.',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    category: Category.VEGETARIAN
  },
  {
    id: '8',
    name: 'Waakye-Style Penne',
    price: 75,
    description: 'Penne pasta infused with sorghum leaves, served with a side of spicy wele and egg.',
    image: 'https://images.unsplash.com/photo-1516685018646-527ad952f864?auto=format&fit=crop&q=80&w=800',
    category: Category.CHEFS_SPECIALS,
    tags: ['Experimental']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Kwame Mensah',
    location: 'Accra, GH',
    text: "I never thought Jollof and Spaghetti could go so well together until I tried Pasta King. It's my new Friday night tradition!",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=kwame'
  },
  {
    id: '2',
    name: 'Sarah Osei',
    location: 'Kumasi, GH',
    text: "The Creamy Shito Penne is absolutely to die for. Just the right amount of heat and creaminess. Highly recommended.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '3',
    name: 'David Appiah',
    location: 'Tema, GH',
    text: "Great ambiance and even better food. It feels like a little piece of Italy right here in Ghana. The service is top notch.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=david'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', category: 'Dishes', title: 'Signature Jollof Pasta', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800' },
  { id: '2', category: 'Interior', title: 'Main Dining Area', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
  { id: '3', category: 'Dishes', title: 'Green Pesto Delight', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800' },
  { id: '4', category: 'Kitchen', title: 'Chef in Action', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
  { id: '5', category: 'Happy Faces', title: 'Good Times', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800' },
  { id: '6', category: 'Dishes', title: 'Creamy Carbonara', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800' }
];
