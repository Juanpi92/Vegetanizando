import React from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container_principal">
        <h1> Nosso Cardapio</h1>
        <div className="container">
          <ProductCard
            src_imagen={"./imagenes/products/bebibdarefrescantetangerina.jpg"}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
