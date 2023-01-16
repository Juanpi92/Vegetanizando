import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/countReducer";
import shoopingReducer from "../reducer/shoopingReducer";

export const store = configureStore({
  reducer: {
    shopping: shoopingReducer,
  },
});
