import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateProductPayload } from './products.payload';
import axios from '../../../lib/axios';
import { RouteName, router } from '../../../models/Router';

export enum ProductsActionType {
  CREATE = 'products/create',
}

export const createProduct = createAsyncThunk(ProductsActionType.CREATE, async ({ data }: CreateProductPayload) => {
  const fileInputId = data.image;
  const file = document.getElementById(fileInputId) as HTMLInputElement;
  console.log(data);

  return;

  if (!process.env.NEXT_PUBLIC_UPLOADER_URL) {
    throw new Error('No uploader URL');
  }

  const productResponse = await axios.post(router.getRouteHref(RouteName.FOOD), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let response = productResponse;
  let message = productResponse.data.message;

  if (file) {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', 'products');
    formData.append('name', data.name);
    const fileResponse = await axios.post(
      process.env.NEXT_PUBLIC_UPLOADER_URL + router.getRouteHref(RouteName.UPLOADER_UPLOAD),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    response = await axios.put(`${router.getRouteHref(RouteName.FOOD)}/${productResponse.data.product.id}`, {
      image: fileResponse.data.path,
    });
  }

  return {
    product: response.data.product,
    message,
  };
});
