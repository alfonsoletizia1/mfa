// import { createStore } from "redux";
// import taskReducer from "./taskReducers";

// const store = createStore(
//   taskReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// export default store;
import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./stateSlicer";
export const store = configureStore({
  reducer: {
    teams: teamReducer,
  },
});
