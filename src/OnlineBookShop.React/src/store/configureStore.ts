import { applyMiddleware, compose, createStore, Middleware } from "redux";
import rootReducer from './reducers';
import ReduxThunk from "redux-thunk";

const middlewares: Middleware[] = [ReduxThunk];

const store = createStore(
  rootReducer, 
  compose(applyMiddleware(...middlewares))
);

export default store;
