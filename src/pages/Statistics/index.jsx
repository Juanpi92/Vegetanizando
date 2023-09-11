import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";
import SalesLinear from "./SalesLinear";
import ProductQuantity from "./ProductQuantity";
import ProductSales from "./ProductSales";
import BestClient from "./BestClient";

const Statistics = () => {
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
      <div className="container_admin_statistics">
        <div className="charts_container">
          <div className="charts_row">
            <SalesLinear />
            <ProductQuantity />
          </div>
          <div className="charts_row">
            <ProductSales />
            <BestClient />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
