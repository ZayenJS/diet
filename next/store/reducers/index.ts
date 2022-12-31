import { combineReducers } from '@reduxjs/toolkit';
import { templateReducer } from './template';

const rootReducer = combineReducers({ template: templateReducer });

export default rootReducer;
