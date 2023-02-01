import React from "react";
import { useDispatch } from "react-redux";
import {
  actualizarItemCart,
  calculateTotalCart,
  delFromCart,
} from "../reducer/shoopingReducer";
import "./CartItem.css";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  let { id, name, quantity, price } = data;
  return (
    <>
      <tr className="cart_item">
        <td>{name}</td>
        <td>
          <input
            type="number"
            min={1}
            max={20}
            defaultValue={1}
            className="compra_cantidad"
            onChange={(event) => {
              dispatch(
                actualizarItemCart({ id: id, quantity: event.target.value })
              );
              dispatch(calculateTotalCart());
            }}
          />
        </td>
        <td>
         R$ {price.toFixed(2)} x {quantity} = R$ {(price * quantity).toFixed(2)}
        </td>
        <td>
          <button
            className="del_button"
            onClick={() => {
              dispatch(delFromCart(id));
              dispatch(calculateTotalCart());
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
