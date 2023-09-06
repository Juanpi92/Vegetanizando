import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  compras: [],
};

export const comprasSlice = createSlice({
  name: "compras",
  initialState,
  reducers: {
    //Eliminar de compras
    delFromCompras: (state, action) => {
      state.compras = state.compras.filter(
        (compra) => compra.id !== action.payload
      );
    },

    //Actualizar Compras
    actualizarCompras: (state, action) => {
      state.compras = action.payload;
    },
    actStatus: (state, action) => {
      state.compras = state.compras.map((item) =>
        item.id === action.payload.id
          ? { ...item, status: action.payload.status }
          : item
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { actualizarCompras, delFromCompras, actStatus } =
  comprasSlice.actions;

export default comprasSlice.reducer;
