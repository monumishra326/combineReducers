import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./auth/reducer";
import { reducer } from "./todos/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: reducer,
});

/**
 *
 * @param {redux state} state
 */

const logger = (state) => (next) => (action) => {
  console.log("dispatching action", action, next, state);
  const val = next(action);
  console.log("Exiting logger");
  return val;
};

const logger2 = (state) => (next) => (action) => {
  console.log("dispatching action", action, next, state);
  const val = next(action);
  console.log("Exiting logger2");
  return val;
};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(logger, logger2));

export const store = createStore(
  rootReducer,
  enhancer
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
