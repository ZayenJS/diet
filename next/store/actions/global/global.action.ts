import { createAction } from '@reduxjs/toolkit';
import { InputChangePayload } from './global.payload';

export enum GlobalActionType {
  INPUT_CHANGE = 'INPUT_CHANGE',
}

export const inputChange = createAction(GlobalActionType.INPUT_CHANGE, (payload: InputChangePayload) => ({
  payload,
}));
