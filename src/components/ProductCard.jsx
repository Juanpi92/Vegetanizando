import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calculateTotalCart } from "../reducer/shoopingReducer";
import "./ProductCard.css";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  let { id, src, name, portion, price } = data;
  return (
    <>
      <div className="card">
        <figure className="imagen_product">
          <img src={src} alt={name} />
        </figure>
        <article className="texto_card">
          <p className="title_card">{name}</p>
          <p>Porção: {portion}</p>
          <p className="price">Preço: {price}Reais</p>
        </article>
        <div className="div_button">
          <button
            onClick={() => {
              dispatch(addToCart(id));
              dispatch(calculateTotalCart());
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
