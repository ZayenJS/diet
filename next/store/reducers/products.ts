import { createReducer } from '@reduxjs/toolkit';
import { inputChange } from '../actions';
import { createProduct } from '../actions/products';

export interface ProductsState {
  create: {
    name: string;
    calories: string;
    protein: string;
    fat: string;
    saturated: string;
    carbs: string;
    sugar: string;
    fiber: string;
    image: string;
  };
  created: boolean;
  loading: boolean;
}

const INITIAL_STATE: ProductsState = {
  create: {
    name: '',
    calories: '',
    protein: '',
    fat: '',
    saturated: '',
    carbs: '',
    sugar: '',
    fiber: '',
    image: '',
  },
  created: false,
  loading: false,
};

export const productsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(inputChange, (state, action) => {
      const isForProductsReducer = action.payload.reducerName === 'products';

      if (isForProductsReducer && Object.keys(state.create).includes(action.payload.name)) {
        const create = {
          ...state.create,
          [action.payload.name]: action.payload.value,
        };

        state.create = create;
        state.created = false;
      }
    })
    .addCase(createProduct.fulfilled, (state) => {
      console.log('Product created successfully');

      state.create = INITIAL_STATE.create;
      state.created = true;
      state.loading = false;
    })
    .addCase(createProduct.rejected, (state) => {
      alert('Something went wrong while creating a product');
      // state.create = INITIAL_STATE.create;
      state.created = false;
      state.loading = false;
    })
    .addCase(createProduct.pending, (state) => {
      console.log('Creating a product...');

      // state.create = INITIAL_STATE.create;
      state.created = false;
      state.loading = true;
    });
});
