import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import AdminProductsList from "../../components/AdminProductsList";

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
  useEffect(() => {
    console.log(dataToEdit);
  }, [dataToEdit]);
  return (
    <>
      <div className="container_admin_product">
        <AdminProductsList setDataToEdit={setDataToEdit} />
      </div>
    </>
  );
};

export default AdminProducts;
