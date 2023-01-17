import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../imagenes/logo.png";

const Navbar = () => {
  const $links = useRef();
  const HandleClick = () => {
    $links.current.classList.toggle("active");
  };
  return (
    <>
      <nav className="navbar">
        <div className="title">
          <img src={Logo} className="logo"></img>
          <span> Vegetanizando</span>
        </div>
        <a className="toggle_button" onClick={HandleClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="link" ref={$links}>
          <ul>
            <li>
              <NavLink to="/" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/acerca" activeclassname="active">
                Acerca
              </NavLink>
            </li>
            <li>
              <NavLink to="/servicos" activeclassname="active">
                Serviços
              </NavLink>
            </li>
            <li>
              <span className="login">Login</span>
            </li>
            <li>
              <NavLink to="/cart" activeclassname="active">
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{ position: "relative" }}
                >
                  <span className="cart_quantity">8</span>
                </i>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
