export type ProductImages = {
  main: string;
  gallery: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: ProductImages;
  specs: Record<string, string | number | boolean>;
  similar?: string[];
};
