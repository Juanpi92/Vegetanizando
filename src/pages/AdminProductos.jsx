import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProductos = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { user } = state.user;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return <div>AdminProductos</div>;
};

export default AdminProductos;
