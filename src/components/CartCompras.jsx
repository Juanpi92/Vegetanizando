import React from "react";
import { useSelector } from "react-redux";
import "./CartCompras.css";
import CartItem from "./CartItem";

const CartCompras = () => {
  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  return (
    <>
      <div className="container_cart">
        <div className="title_principal">
          <p>Compras Realizadas</p>
        </div>
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
              <CartItem data={cartItem} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartCompras;
