import { Ingredient, Product } from '@prisma/client';

export type IngredientWithProduct = Ingredient & {
  product: Product;
};
