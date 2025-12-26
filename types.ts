
export enum Category {
  ALL = 'All',
  CHEFS_SPECIALS = 'Chef\'s Specials',
  MEAT_LOVERS = 'Meat Lovers',
  SEAFOOD = 'Seafood',
  VEGETARIAN = 'Vegetarian'
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  image: string;
  title: string;
}
