import { createReducer } from '@reduxjs/toolkit';
import { inputChange } from '../actions';

export type GlobalState = {};

const INITIAL_STATE: GlobalState = {};
export const globalReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(inputChange, (state, action) => {
    // for global input fields like search, etc.
  });
});
