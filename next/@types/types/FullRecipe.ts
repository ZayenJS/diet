import { Category, Recipe, RecipeImage, RecipeRating, Step, Tag, Tool, User } from '@prisma/client';
import { IngredientWithProduct } from './IngredientWithProduct';

export interface FullRecipe extends Recipe {
  ingredients?: IngredientWithProduct[];
  steps?: Step[];
  images?: RecipeImage[];
  tags?: Tag[];
  tools?: Tool[];
  author?: User;
  rates?: RecipeRating[];
  category?: Category;
}
