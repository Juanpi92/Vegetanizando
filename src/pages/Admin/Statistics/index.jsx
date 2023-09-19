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
  const [content, setContent] = useState(null);
  const [active, setActive] = useState("sales-linear");

  const SectionContainer = ({ children }) => {
    return (
      <section className="charts-content">
        {children}
      </section >
    )
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setContent(<SectionContainer children={<SalesLinear />} />)
  }, []);

  const handleSelected = (e) => {
    if (e === 'sales-linear') {
      setContent(<SectionContainer children={<SalesLinear />} />)
      setActive(e)
    } else if (e === 'product-quantity') {
      setContent(<SectionContainer children={<ProductQuantity />} />)
      setActive(e)
    } else {
      setContent(
        <SectionContainer
          children={
            <>
              <ProductSales />
              <BestClient />
            </>
          }
        />
      )
      setActive(e)
    }
  }

  return (
    <div className="container_admin_statistics">
      <div className="charts_container">
        <nav className="charts-nav-container">
          <ul className="charts-list-content">
            <li onClick={(e) => handleSelected("sales-linear")} className={active === "sales-linear" ? "chart-item active" : "chart-item"}>Resumo de Vendas</li>
            <li onClick={(e) => handleSelected("product-quantity")} className={active === "product-quantity" ? "chart-item active" : "chart-item"}>Quantidade de Produtos</li>
            <li onClick={(e) => handleSelected("product-sales")} className={active === "product-sales" ? "chart-item active" : "chart-item"}>Vendas</li>
          </ul>
        </nav>
        {content}
      </div>
    </div >
  );
};

export default Statistics;
