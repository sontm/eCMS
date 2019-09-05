import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import CategoryReducer from './reducers/CategoryReducer';
import ProductReducer from './reducers/ProductReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  category: CategoryReducer,
  product: ProductReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
