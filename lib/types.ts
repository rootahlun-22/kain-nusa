export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductVariant {
  id: string;
  colorName: string;
  colorCode?: string;
  modelName?: string;
  imageUrl: string;
  availableSizes: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  stock: number;
  specifications: Record<string, string>;
  isBestSeller: boolean;
  variants: ProductVariant[];
  relatedIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
}

export interface KainNusaData {
  categories: Category[];
  products: Product[];
  admins: AdminUser[];
}
