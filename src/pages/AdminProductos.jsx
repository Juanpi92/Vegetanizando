import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProductAdmin from "../components/CartProductAdmin";
import FormAdminProductos from "../components/FormAdminProductos";
import "./AdminProductos.css";

const AdminProductos = () => {
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
        <FormAdminProductos />
        <CartProductAdmin />
      </div>
    </>
  );
};

export default AdminProductos;
