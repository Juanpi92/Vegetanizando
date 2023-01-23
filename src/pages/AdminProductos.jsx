import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProductAdmin from "../components/CartProductAdmin";
import FormAdminProductos from "../components/FormAdminProductos";
import "./AdminProductos.css";

const AdminProductos = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { user } = state.user;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="container_admin_product">
        <FormAdminProductos
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <CartProductAdmin setDataToEdit={setDataToEdit} />
      </div>
    </>
  );
};

export default AdminProductos;
