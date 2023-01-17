import React from "react";
import "./ProductCard.css";
import Src from "../imagenes/products/bebibdarefrescantetangerina.jpg";

const ProductCard = () => {
  return (
    <>
      <div className="card">
        <figure className="imagen_product">
          <img src={Src} alt={Src} />
        </figure>
        <article className="texto_card">
          <p className="title_card">Bebida refrescante</p>
          <p className="description">Laranja, abacate e coco</p>
          <p>Porcion: 500ml</p>
          <p className="price">Preço: 15.0 Reais</p>
        </article>
        <div className="div_button">
          <button>Adicionar</button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
