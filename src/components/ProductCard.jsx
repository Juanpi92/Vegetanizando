import React from "react";
import "./ProductCard.css";

const ProductCard = ({ data }) => {
  let { id, src, name, description, portion, price } = data;
  return (
    <>
      <div className="card">
        <figure className="imagen_product">
          <img src={src} alt={name} />
        </figure>
        <article className="texto_card">
          <p className="title_card">{name}</p>
          <p>Porção: {portion}</p>
          <p className="price">Preço:{price}Reais</p>
        </article>
        <div className="div_button">
          <button>Adicionar</button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
