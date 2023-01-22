import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Error404.css";
import imagen404 from "/imagenes/404.png";

const Error404 = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { user } = state.user;
  useEffect(() => {
    if (user) {
      navigate("/admin/products");
    }
  }, []);

  return (
    <>
      <div className="container_principal">
        <figure className="figure404">
          <img src={imagen404} alt="Error 404" className="imagen404" />
          <figcaption>O recurso solicitado ñao foi encontrado</figcaption>
        </figure>
      </div>
    </>
  );
};

export default Error404;
