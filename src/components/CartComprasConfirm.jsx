import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./CartCompras.css";
import { calculateTotalCart, delCart } from "../reducer/shoopingReducer";

const CartComprasConfirm = ({ container_cart, container_confirm }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  return (
    <div className="container_confirm_right" ref={container_confirm}>
      <button
        onClick={() => {
          container_cart.current.classList.remove("container_cart_left");
          container_confirm.current.classList.add("container_confirm_right");
        }}
      >
        Voltar
      </button>
      <button
        onClick={() => {
          container_cart.current.classList.remove("container_cart_left");
          container_confirm.current.classList.add("container_confirm_right");

          dispatch(delCart());
          dispatch(calculateTotalCart());
          alert("Obrigado pela compra, disfrute sua comida");

          //Realizar insercion de las opciones de compra en el server
          let data = {
            usuario: "Pedro Moura",
            cpf: "069.487.018-97",
            address: "Rua General Cannabaro 210. Maracña. Rio de Janeiro",
            cart: cart,
            totalCart: totalCart,
          };
          axios.post("https://vegetanizando-api.onrender.com/compras", data);
        }}
      >
        Confirmar Compra
      </button>
    </div>
  );
};

export default CartComprasConfirm;
