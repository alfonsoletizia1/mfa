// import { createStore } from "redux";
// import taskReducer from "./taskReducers";

// const store = createStore(
//   taskReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// export default store;
// import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = { key: "root", version: 1, storage: AsyncStorage };
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };
import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./stateSlicer";

const persistedReducer = persistReducer(persistConfig, teamReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
