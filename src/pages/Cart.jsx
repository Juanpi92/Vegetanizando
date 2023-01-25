import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCompras from "../components/CartCompras";
import CartComprasConfirm from "../components/CartComprasConfirm";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;

  const container_cart = useRef();
  const container_confirm = useRef();
  return (
    <>
      <div className="container_principal">
        <CartCompras
          container_cart={container_cart}
          container_confirm={container_confirm}
        />
        {/*Aqui el form de Gustavo*/}
        <CartComprasConfirm
          container_cart={container_cart}
          container_confirm={container_confirm}
        />
      </div>
    </>
  );
};

export default Cart;
