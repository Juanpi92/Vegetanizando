import { configureStore } from "@reduxjs/toolkit";
import shoopingReducer from "../reducer/shoopingReducer";

export const store = configureStore({
  reducer: {
    shopping: shoopingReducer,
  },
});
