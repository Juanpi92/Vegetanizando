import React from "react";
import { useDispatch } from "react-redux";
import {
  actualizarItemCart,
  calculateTotalCart,
  delFromCart,
} from "../../../reducer/shoopingReducer";
import "./styles.css";
import { AddOutlined, CloseOutlined, RemoveOutlined } from "@mui/icons-material";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  let { id, name, quantity, price, url } = data;

  return (
    <tr className="cart-item-container">
      <td className="cart-item-media">
        <img src={url} alt="" className="cart-item-image" />
      </td>
      <td className="cart-item-name">{name}</td>
      <td className="cart-item-quantity">
        <RemoveOutlined onClick={() => {
          if (quantity === 1) {
            dispatch(delFromCart(id))
          } else {
            dispatch(
              actualizarItemCart({ id: id, quantity: quantity - 1 })
            );
          }
          dispatch(calculateTotalCart());
        }} />
        <label className="cart-quantity-label">
          {quantity}
        </label>
        <AddOutlined onClick={() => {
          if (quantity === 10) {
            return
          } else {
            dispatch(
              actualizarItemCart({ id: id, quantity: quantity + 1 })
            );
            dispatch(calculateTotalCart());
          }
        }} />
      </td>
      <td className="cart-item-subtotal">
        R$ {(price * quantity).toFixed(2)}
      </td>
      <td>
        <CloseOutlined
          className="cart-item-remove-icon"
          onClick={() => {
            dispatch(delFromCart(id));
            dispatch(calculateTotalCart());
          }}
        />
      </td>
    </tr>
  );
};

export default CartItem;
