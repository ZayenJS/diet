import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateProductPayload } from './products.payload';
import axios from '../../../lib/axios';

export enum ProductsActionType {
  CREATE = 'CREATE',
}

export const createProduct = createAsyncThunk(ProductsActionType.CREATE, async ({ data }: CreateProductPayload) => {
  const image = document.getElementById(data.image) as HTMLInputElement | null;

  const file = image?.files?.[0];

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('calories', data.calories);
  formData.append('protein', data.protein);
  formData.append('fat', data.fat);
  formData.append('saturated', data.saturated);
  formData.append('carbs', data.carbs);
  formData.append('sugar', data.sugar);
  formData.append('fiber', data.fiber);
  if (file) formData.append('image', file);

  const response = await axios.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
});
