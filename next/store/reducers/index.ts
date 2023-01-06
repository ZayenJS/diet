import { globalReducer } from './global';
import { recipesReducer } from './recipes';
import { productsReducer } from './products';

const rootReducer = { global: globalReducer, recipes: recipesReducer, products: productsReducer };

export default rootReducer;
