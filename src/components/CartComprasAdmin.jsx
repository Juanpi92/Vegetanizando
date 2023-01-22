import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { delFromCompras } from "../reducer/comprasReducer";
import "./CartItem.css";
import "./CartComprasAdmin.css";
import ModalComprasAdmin from "./ModalComprasAdmin";

const CartComprasAdmin = ({ data }) => {
  const dispatch = useDispatch();
  let { id, usuario, cpf, address, totalCart, cart } = data;
  const $modalCompra = useRef();
  return (
    <>
      <tr className="cart_item">
        <td>{usuario}</td>
        <td>{cpf}</td>
        <td>{address}</td>
        <td>{totalCart.toFixed(2)} Reais</td>
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
            <button
              className="see_button"
              onClick={() => {
                $modalCompra.current.classList.remove("arriba");
              }}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
        </td>
      </tr>
      <ModalComprasAdmin
        cart={cart}
        totalCart={totalCart}
        usuario={usuario}
        $modalCompra={$modalCompra}
      />
    </>
  );
};

export default CartComprasAdmin;
