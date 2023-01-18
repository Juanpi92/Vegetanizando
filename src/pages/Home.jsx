import React, { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { actualizarProductos } from "../reducer/shoopingReducer";
import axios from "axios";
import Loader from "../components/Loader";

const Home = () => {
  const [modal, setModal] = useState(true);
  /*useEffect(() => {
    
  }, []);*/

  useEffect(() => {
    axios
      .get("https://vegetanizando-api.onrender.com/products")
      .then((respuesta) => {
        dispatch(actualizarProductos(respuesta.data));
        setTimeout(() => {
          setModal(false);
        }, 1000);
      })
      .catch();
  }, []);
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const dispatch = useDispatch();
  return (
    <>
      {modal ? (
        <Loader />
      ) : (
        <div className="container_principal">
          <h1> Nosso Cardapio</h1>
          <div className="container">
            {products.map((producto) => (
              <ProductCard data={producto} key={producto.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
