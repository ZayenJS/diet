import { Recipe, RecipeImage, Step, Tag, Tool } from '@prisma/client';
import { IngredientWithProduct } from './IngredientWithProduct';

export interface FullRecipe extends Recipe {
  ingredients?: IngredientWithProduct[];
  steps?: Step[];
  images?: RecipeImage[];
  tags?: Tag[];
  tools?: Tool[];
}
