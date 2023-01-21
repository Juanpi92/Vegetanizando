import { createSlice } from "@reduxjs/toolkit";

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
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actualizarCompras, delFromCompras } = comprasSlice.actions;

export default comprasSlice.reducer;
