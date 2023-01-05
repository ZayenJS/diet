import { Difficulty } from '@prisma/client';
import { createReducer } from '@reduxjs/toolkit';
import { deleteIngredient, deleteStep, inputChange } from '../actions';

export interface RecipesState {
  name: string;
  description: string;
  difficulty: string;
  rating: string;
  cost: string;
  preparationTime: string;
  cookingTime: string;
  restTime: string;
  thumbnail: string;
  forHowMany: string;
  calories: string;
  protein: string;
  fat: string;
  saturated: string;
  carbs: string;
  sugar: string;
  ingredients: {
    [key: string]: {
      _id: string;
      name: string;
      quantity: string;
      unit: string;
    };
  };
  steps: {
    [key: string]: string;
  };
}

const INITIAL_STATE: RecipesState = {
  name: '',
  description: '',
  difficulty: Difficulty.EASY,
  rating: '',
  cost: '',
  preparationTime: '',
  cookingTime: '',
  restTime: '',
  thumbnail: '',
  forHowMany: '',
  calories: '',
  protein: '',
  fat: '',
  saturated: '',
  carbs: '',
  sugar: '',
  ingredients: {},
  steps: {},
};

export const recipesReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(inputChange, (state, action) => {
      const isForRecipesReducer = action.payload.reducerName === 'recipes';

      const regex = /^(ingredients|steps)/gi;
      if (isForRecipesReducer && regex.test(action.payload.name)) {
        // payload.name will look like '(ingredients|steps):some_id:some_key'
        const [type, id, key] = action.payload.name.split(':');

        if (type === 'ingredients') {
          const ingredient = state.ingredients[id];

          if (ingredient) {
            state.ingredients[id] = {
              ...ingredient,
              [key]: action.payload.value,
            };
            return;
          }

          state.ingredients[id] = {
            _id: id,
            name: '',
            quantity: '',
            unit: '',
            [key]: action.payload.value,
          };
          return;
        }

        if (type === 'steps') {
          state.steps[id] = action.payload.value;
          return;
        }
      }

      if (isForRecipesReducer && Object.keys(state).includes(action.payload.name)) {
        // @ts-expect-error - we know that the name is a key of the state with a string value
        state[action.payload.name as keyof RecipesState] = action.payload.value;
      }
    })
    .addCase(deleteIngredient, (state, action) => {
      delete state.ingredients[action.payload.id];
    }).addCase(deleteStep, (state, action) => {
      delete state.steps[action.payload.id];
    })
});
