import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import localForage from "localforage";

import reducers from "./index";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: "root",
  storage: localForage
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

//@ts-ignore
export const persistor = persistStore(store);
