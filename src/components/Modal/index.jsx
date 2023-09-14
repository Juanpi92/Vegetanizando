import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./styles.css";
import AddProduct from "../../pages/AdminProducts/AddProduct";

export default function Modal() {
  const { showModal, setShowModal, isAddProduct } = useContext(AppContext);

  return (
    <>
      {showModal && (
        <div className="modal-container">
          <div
            onClick={() => setShowModal(false)}
            className="modal-overlay"
          ></div>
          <div className="modal-content">
               {isAddProduct ? <AddProduct /> : null}
          </div>
        </div>
      )}
    </>
  );
};
