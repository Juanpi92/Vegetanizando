import React, { useRef, useState } from "react";
import "./CartProductAdmin.css";
import "./CartCompras.css";
import { useSelector } from "react-redux";
import CartItemProductAdmin from "./CartItemProductAdmin";
import ModalProductAdmin from "./ModalProductAdmin";

const CartProductAdmin = ({ setDataToEdit }) => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const $ModalProductAdmin = useRef();
  const [srcImagen, SetSrcImagen] = useState();

  return (
    <>
      <div className="cart_admin_product">
        <div className="table">
          <table className="table_cart">
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th>Porcion</th>
                <th>Preço</th>
                <th>Opcion</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <CartItemProductAdmin
                  product={product}
                  key={product.id}
                  $ModalProductAdmin={$ModalProductAdmin}
                  SetSrcImagen={SetSrcImagen}
                  setDataToEdit={setDataToEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalProductAdmin
        $ModalProductAdmin={$ModalProductAdmin}
        srcImagen={srcImagen}
      />
    </>
  );
};

export default CartProductAdmin;
