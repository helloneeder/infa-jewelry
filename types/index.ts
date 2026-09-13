export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: 'necklaces' | 'bracelets' | 'rings' | 'earrings';
  description: string;
  details: string[];
  material: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
