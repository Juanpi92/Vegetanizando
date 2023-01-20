import React, { useRef } from "react";
import CartCompras from "../components/CartCompras";

const Cart = () => {
  const container_cart = useRef();
  const container_confirm = useRef();
  return (
    <>
      <div className="container_principal">
        <CartCompras
          container_cart={container_cart}
          container_confirm={container_confirm}
        />
        <div className="container_confirm_right" ref={container_confirm}>
          <button
            onClick={() => {
              container_cart.current.classList.remove("container_cart_left");
              container_confirm.current.classList.add(
                "container_confirm_right"
              );
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
