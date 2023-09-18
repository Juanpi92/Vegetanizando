import { configureStore } from "@reduxjs/toolkit";
import comprasReducer from "../reducer/comprasReducer";
import shoopingReducer from "../reducer/shoopingReducer";
import userReducer from "../reducer/userReducer";
import plansReducer from "../reducer/plansReducer";

export const store = configureStore({
  reducer: {
    shopping: shoopingReducer,
    user: userReducer,
    compras: comprasReducer,
    plans: plansReducer,
  },
});
