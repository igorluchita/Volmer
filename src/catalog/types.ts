export type CatalogLocale = "ro" | "ru";
export type LocalizedText = Record<CatalogLocale, string>;
export interface ProductImage {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
}
export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  image?: ProductImage;
  published: boolean;
  order?: number;
  seo?: { title: LocalizedText; description: LocalizedText };
}
export interface Subcategory {
  id: string;
  categoryId: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  published: boolean;
}
export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  subcategoryId?: string;
  name: LocalizedText;
  brand?: string;
  model?: string;
  images: ProductImage[];
  price?: { amount: number; currency: string };
  priceOnRequest?: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  specifications: { label: LocalizedText; value: LocalizedText }[];
  features: LocalizedText[];
  documents?: { label: LocalizedText; href: string }[];
  relatedProductIds?: string[];
  published: boolean;
  commercialVerified?: boolean;
  seo?: { title: LocalizedText; description: LocalizedText };
}
export interface CatalogData {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
}
