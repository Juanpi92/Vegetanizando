import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AdminProductos.css";
import AdminProductsList from "../components/AdminProductsList";

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
        <AdminProductsList />
      </div>
    </>
  );
};

export default AdminProductos;
