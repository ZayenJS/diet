import { createAction } from '@reduxjs/toolkit';
import { DeleteIngredientPayload, DeleteStepPayload } from './recipes.payload';

export enum RecipesActionType {
  DELETE_INGREDIENT = 'recipes:delete_ingredient',
  DELETE_STEP = 'recipes/delete_step',
}

export const deleteIngredient = createAction(
  RecipesActionType.DELETE_INGREDIENT,
  (payload: DeleteIngredientPayload) => ({
    payload,
  }),
);

export const deleteStep = createAction(RecipesActionType.DELETE_STEP, (payload: DeleteStepPayload) => ({
  payload,
}));
