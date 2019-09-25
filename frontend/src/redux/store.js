import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import ProductQueryReducer from './ProductQueryReducer';
import CartReducer from './CartReducer';
import DiscountReducer from './DiscountReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  category: CategoryReducer,
  product: ProductReducer,
  query: ProductQueryReducer, // Product Query options
  cart: CartReducer,
  discount: DiscountReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
