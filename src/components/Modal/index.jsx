import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./styles.css";
import AddProduct from "../../pages/AdminProducts/AddProduct";
import EditProduct from "../../pages/AdminProducts/EditProduct";

export default function Modal({ dataToEdit }) {
  const { showProductModal, setShowProductModal, isAddProduct } =
    useContext(AppContext);

  return (
    <>
      {showProductModal && (
        <div className="modal-container">
          <div
            onClick={() => setShowProductModal(false)}
            className="modal-overlay"
          ></div>
          <div className="modal-content">
            {isAddProduct ? (
              <AddProduct />
            ) : (
              <EditProduct dataToEdit={dataToEdit} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
