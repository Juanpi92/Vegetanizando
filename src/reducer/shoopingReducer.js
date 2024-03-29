import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
  totalCart: 0,
};

export const shoppingSlice = createSlice({
  name: "shooping",
  initialState,
  reducers: {
    //Adicionar al Cart
    addToCart: (state, action) => {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );
      let itemInCart = state.cart.find((item) => item.id === newItem.id);
      if (itemInCart) {
        // se já houver este item no carrinho
      } else {
        state.cart = [...state.cart, { ...newItem, quantity: 1 }];
      }
      localStorage.setItem("cartlocal", JSON.stringify(state.cart));
    },
    //actualizar Cantidad del Item en el Cart
    actualizarItemCart: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cartlocal", JSON.stringify(state.cart));
    },
    //Eliminar del Cart
    delFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      if (state.cart.length === 0) {
        localStorage.removeItem("cartlocal");
      } else {
        localStorage.setItem("cartlocal", JSON.stringify(state.cart));
      }
    },
    //Vaciar Cart
    delCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cartlocal");
    },
    calculateTotalCart: (state) => {
      state.totalCart = 0;
      state.cart.map((element) => {
        state.totalCart += element.price * element.quantity;
      });
    },
    //Actualizar Cart
    actualizarCart: (state, action) => {
      state.cart = action.payload;
    },
    //Actualizar Productos
    actualizarProductos: (state, action) => {
      state.products = action.payload;
    },
    //Eliminar Producto
    delProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    //AdicionarProcucto
    addItemProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    //Actualizar Producto
    actualizarItemProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  actualizarProductos,
  delProduct,
  addItemProduct,
  actualizarItemProduct,
  addToCart,
  actualizarItemCart,
  delFromCart,
  delCart,
  calculateTotalCart,
  actualizarCart,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
