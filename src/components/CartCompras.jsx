import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delCart } from "../reducer/shoopingReducer";
import "./CartCompras.css";
import CartItem from "./CartItem";

const CartCompras = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  const HandleComprar = () => {
    dispatch(delCart());
    dispatch(calculateTotalCart());
    alert("Obrigado pela compra, disfrute sua comida");
    //Realizar insercion de las opciones de compra en el server
  };
  return (
    <>
      <div className="container_cart">
        <div className="title_principal">
          <p>Compras Realizadas</p>
        </div>
        <div className="table">
          <table className="table_card">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Cantidade</th>
                <th>Preço</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => (
                <CartItem data={cartItem} key={cartItem.id} />
              ))}
            </tbody>
          </table>
          <div className="info_cart">
            <span>Total: {totalCart}.00 Reais</span>
            <button className="button_principal" onClick={HandleComprar}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCompras;
