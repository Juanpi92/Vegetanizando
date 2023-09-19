import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import Modal from "../../../components/Modal";
import AdminPlansList from "./AdminPlansList";

const AdminPlans = () => {
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
        <AdminPlansList setDataToEdit={setDataToEdit} />
      </div>
    </>
  );
};

export default AdminPlans;
