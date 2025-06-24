export interface Product {
    id: string;
    title: string;
    description: string;
    images: {
      image: string;
    }[];
    price: number;
    original_price: number;
    category: string;
    brand: string;
    rating: number;
    in_stock: boolean;
    stock_count: number;
    tags: string[];
    discount: number;
    features: string[];
    return_policy: string;
    warranty: string;
  }
  