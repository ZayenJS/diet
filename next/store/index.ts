import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducers';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type Store = ReturnType<typeof makeStore>;
export type State = ReturnType<typeof rootReducer>;
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Action>;

export default createWrapper(makeStore);
