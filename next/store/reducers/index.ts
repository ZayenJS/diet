import { combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './global';
import { recipesReducer } from './recipes';

const rootReducer = combineReducers({ global: globalReducer, recipes: recipesReducer });

export default rootReducer;
