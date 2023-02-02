import React, { useRef } from "react";
import CartModalComprasAdmin from "./CartModalComprasAdmin";
import "./ModalComprasAdmin.css";

const ModalComprasAdmin = ({ comprasModal, $modalCompra }) => {
  let { usuario, totalCart, cart } = comprasModal;
  return (
    <>
      <div className="modal_product arriba" ref={$modalCompra}>
        <div className="contenedor_product">
          <span
            className="button_close"
            onClick={() => {
              $modalCompra.current.classList.add("arriba");
            }}
          >
            X
          </span>
          <div className="container_cart">
            <div className="title_principal">
              <p>Compras de {usuario}</p>
            </div>
            <div className="table">
              <table className="table_cart">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Cantidade</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((compra) => (
                    <CartModalComprasAdmin compra={compra} key={compra.id} />
                  ))}
                </tbody>
              </table>
              <div className="info_cart">
                <span>Total: R$ {totalCart.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComprasAdmin;
