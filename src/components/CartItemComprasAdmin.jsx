import React from "react";
import { useDispatch } from "react-redux";
import { delFromCompras } from "../reducer/comprasReducer";
import "./CartItem.css";
import "./CartItemComprasAdmin.css";

const CartItemComprasAdmin = ({ data }) => {
  const dispatch = useDispatch();
  let { id, usuario, cpf, address, totalCart, cart } = data;
  return (
    <>
      <tr className="cart_item">
        <td>{usuario}</td>
        <td>{cpf}</td>
        <td>{address}</td>
        <td>{totalCart}</td>
        <td>
          <div className="botones">
            <button
              className="del_button"
              onClick={() => {
                dispatch(delFromCompras(id));
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button className="see_button">
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CartItemComprasAdmin;
