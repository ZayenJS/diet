import { createAction } from '@reduxjs/toolkit';
import { SetTemplatePayload } from './template.payload';

export enum TemplateActionType {
  SET_TEMPLATE = 'SET_TEMPLATE',
}

export const setTemplate = createAction(
  TemplateActionType.SET_TEMPLATE,
  (payload: SetTemplatePayload) => ({ payload }),
);
