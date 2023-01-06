import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';

import rootReducer from './reducers';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

const combinedReducers = combineReducers(rootReducer);

export type Store = ReturnType<typeof makeStore>;
export type State = ReturnType<typeof combinedReducers>;
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Action>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default createWrapper(makeStore);
