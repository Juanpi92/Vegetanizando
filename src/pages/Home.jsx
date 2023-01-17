import React from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container_principal">
        <h1> Nosso Cardapio</h1>
        <div className="container">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  );
};

export default Home;
