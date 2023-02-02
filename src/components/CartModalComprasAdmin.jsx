import React from "react";
import "./CartCompras.css";

const CartModalComprasAdmin = ({ compra }) => {
  let { name, quantity, price } = compra;
  return (
    <>
      <tr className="cart_item">
        <td>{name}</td>
        <td>{quantity}</td>
        <td>
          R$ {price.toFixed(2)} x {quantity} = R$ {(price * quantity).toFixed(2)}
        </td>
      </tr>
    </>
  );
};

export default CartModalComprasAdmin;
