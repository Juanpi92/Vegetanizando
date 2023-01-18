import React from "react";
import "./CartItem.css";

const CartItem = ({ data }) => {
  let { id, name, quantity, price } = data;
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>
          <input
            type="number"
            min={1}
            max={20}
            defaultValue={1}
            className="compra_cantidad"
          />
        </td>
        <td>
          ${price}.00 x {quantity} = ${price * quantity}.00
        </td>
        <td>Germany</td>
      </tr>
    </>
  );
};

export default CartItem;
