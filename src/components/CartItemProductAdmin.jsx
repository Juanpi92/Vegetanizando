import React from "react";
import "./CartItem.css";

const CartItemProductAdmin = ({ product }) => {
  let { name, portion, price, src } = product;
  console.log(product);
  return (
    <>
      <tr className="cart_item">
        <td>{name}</td>
        <td>{portion}</td>
        <td>{price}</td>
        <td>
          <div className="botones">
            <button
              className="see_button"
              onClick={() => {
                //  $modalCompra.current.classList.remove("arriba");
              }}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
            <button
              className="del_button"
              onClick={() => {
                //dispatch(delFromCompras(id));
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>

            <button className="edit_button">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CartItemProductAdmin;
