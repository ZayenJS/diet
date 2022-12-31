import { createReducer } from '@reduxjs/toolkit';
import { setTemplate } from '../actions';

export type TemplateState = {
  template: string;
};

const INITIAL_STATE: TemplateState = {
  template: '',
};
export const templateReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(setTemplate, (state, action) => {
    state.template = action.payload.template;
  });
});
