import React from "react";
import "./Error404.css";

const Error404 = () => {
  return (
    <>
      <div className="container_principal">
        <figure className="figure404">
          <img src="./imagenes/404.png" alt="Error 404" className="imagen404" />
          <figcaption>O recurso solicitado ñao foi encontrado</figcaption>
        </figure>
      </div>
    </>
  );
};

export default Error404;
