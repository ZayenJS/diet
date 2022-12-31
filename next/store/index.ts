import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [],
});

export type State = ReturnType<typeof rootReducer>;

export default store;
