import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "Producto 1", price: 100 },
    { id: 2, name: "Producto 2", price: 200 },
    { id: 3, name: "Producto 3", price: 300 },
    { id: 4, name: "Producto 4", price: 400 },
    { id: 5, name: "Producto 5", price: 500 },
    { id: 6, name: "Producto 6", price: 600 },
  ],
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
        alert("Ya el producto esta no cart");
      } else {
        state.cart = [...state.cart, { ...newItem, quantity: 1 }];
      }
    },
    //actualizar Cantidad del Item en el Cart
    actualizarItemCart: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    },
    //Eliminar del Cart
    delFromCart: (state, action) => {
      console.log(action.payload);
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    //Vaciar Cart
    delCart: (state) => {
      state.cart = [];
    },
    calculateTotalCart: (state) => {
      state.totalCart = 0;
      state.cart.map((element) => {
        state.totalCart += element.price * element.quantity;
      });
    },
    actualizarProductos: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  actualizarProductos,
  addToCart,
  actualizarItemCart,
  delFromCart,
  delCart,
  calculateTotalCart,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
