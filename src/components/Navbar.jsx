import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../imagenes/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import { actualizarProductos } from "../reducer/shoopingReducer";

const Navbar = () => {
  const [modal, setModal] = useState(false);
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

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  const $links = useRef();
  const HandleClick = () => {
    $links.current.classList.toggle("link_active");
  };
  return (
    <>
      {modal && <Loader />}
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
                  <span className="cart_quantity">{cart.length}</span>
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
