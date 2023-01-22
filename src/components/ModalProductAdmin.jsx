import React, { useRef } from "react";
import "./ModalComprasAdmin.css";
import "./ModalProductAdmin.css";

const ModalProductAdmin = ({ srcImagen, $ModalProductAdmin }) => {
  return (
    <>
      <div className="modal_product arriba" ref={$ModalProductAdmin}>
        <div className="contenedor_product">
          <span
            className="button_close"
            onClick={() => {
              $ModalProductAdmin.current.classList.add("arriba");
            }}
          >
            X
          </span>
          <div className="container_figure">
            <figure>
              <img src={`.${srcImagen}`} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalProductAdmin;
