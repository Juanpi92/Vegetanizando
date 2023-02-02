import React from "react";
import { useDispatch } from "react-redux";
import { delProduct } from "../reducer/shoopingReducer";
import "./CartItem.css";

const CartItemProductAdmin = ({
  product,
  $ModalProductAdmin,
  SetSrcImagen,
  setDataToEdit,
}) => {
  let { id, name, portion, price, src } = product;
  const dispatch = useDispatch();
  return (
    <>
      <tr className="cart_item">
        <td>{name}</td>
        <td>{portion}</td>
        <td>R$ {price}</td>
        <td>
          <div className="botones">
            <button
              className="see_button"
              onClick={() => {
                SetSrcImagen(src);
                $ModalProductAdmin.current.classList.remove("arriba");
              }}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
            <button
              className="del_button"
              onClick={() => {
                dispatch(delProduct(id));
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>

            <button
              className="edit_button"
              onClick={() => {
                setDataToEdit(product);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CartItemProductAdmin;
