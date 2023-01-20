import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalCart, delCart } from "../reducer/shoopingReducer";
import "./CartCompras.css";
import CartItem from "./CartItem";

const CartCompras = ({ container_cart, container_confirm }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  const HandleComprar = () => {
    if (cart.length === 0) {
      return alert("O seu cart esta vazio ainda");
    }
    container_cart.current.classList.add("container_cart_left");
    container_confirm.current.classList.remove("container_confirm_right");
  };
  return (
    <>
      <div className="container_cart" ref={container_cart}>
        <div className="title_principal">
          <p>Compras Realizadas</p>
        </div>
        <div className="table">
          <table className="table_cart">
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
