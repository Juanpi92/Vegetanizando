import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./CartCompras.css";
import { calculateTotalCart, delCart } from "../reducer/shoopingReducer";

const CartComprasConfirm = ({ setCompraShow }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  return (
    <div className="container_cart">
      <button
        className="button_principal"
        onClick={() => {
          setCompraShow(true);
        }}
      >
        Voltar
      </button>
      <button
        className="button_principal"
        onClick={() => {
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
          setCompraShow(true);
        }}
      >
        Confirmar Compra
      </button>
    </div>
  );
};

export default CartComprasConfirm;
