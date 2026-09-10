export type Product = {
  image?: string;
  name: string;
  category?: string;
  shortSpecification?: string;
  availability?: string;
  minimumOrderQuantity?: string;
};

export const products: Product[] = [];

export const productCategoryPlaceholders = [
  'Product category 01',
  'Product category 02',
  'Product category 03',
  'Product category 04',
];
