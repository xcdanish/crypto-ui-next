// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features/reducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
