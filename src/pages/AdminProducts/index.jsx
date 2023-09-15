import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import AdminProductsList from "../../components/AdminProductsList";
import Modal from "../../components/Modal";

const AdminProducts = () => {
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
      <Modal dataToEdit={dataToEdit} />
      <div className="container_admin_product">
        <AdminProductsList setDataToEdit={setDataToEdit} />
      </div>
    </>
  );
};

export default AdminProducts;
