import React, { useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const $links = useRef();
  const HandleClick = () => {
    $links.current.classList.toggle("active");
  };
  return (
    <>
      <nav className="navbar">
        <div className="title">
          <img
            src="https://github.com/Juanpi92/Vegetanizando/blob/main/src/imagenes/logo.png?raw=true"
            className="logo"
          ></img>
          <span> Vegeteranizando</span>
        </div>
        <a className="toggle_button" onClick={HandleClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="link" ref={$links}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/acerca">Acerca</a>
            </li>
            <li>
              <a href="/servicos">Serviços</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
