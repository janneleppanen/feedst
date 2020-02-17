import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import localForage from "localforage";

import reducers from "./index";

const persistConfig = {
  key: "root",
  storage: localForage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
//@ts-ignore
export const persistor = persistStore(store);
