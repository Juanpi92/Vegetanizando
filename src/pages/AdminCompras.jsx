import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminCompras = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { user } = state.user;
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  return <div>AdminCompras</div>;
};

export default AdminCompras;
