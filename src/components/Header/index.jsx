import React, { useContext } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { LocalMallOutlined } from "@mui/icons-material";
import Loader from "../Loader";
import { AppContext } from "../../contexts/AppContext";
import logo from '../../assets/imagenes/new-logo.png'

export default function Header() {
  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  const { loader } = useContext(AppContext);

  return (
    <>
      <header className="header-container">
        <h1 className="header-logo-title">
          VEGETANIZAND
          <img
            src={logo}
            alt="Vegetanizando logo"
            className="app-logo"
          />
        </h1>
      </header>
      <header className="header-container-desktop">
        <h1 className="header-logo-title">
          VEGETANIZAND
          <img
            src={logo}
            alt="Vegetanizando logo"
            className="app-logo"
          />
        </h1>
        <nav className="nav-desktop-container">
          <ul className="nav-desktop-content">
            <li>
              <NavLink
                to="/"
                activeclasname="active"
                className="nav-desktop-item"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/acerca"
                activeclasname="active"
                className="nav-desktop-item"
              >
                Acerca
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/servicos"
                activeclasname="active"
                className="nav-desktop-item"
              >
                Serviços
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                activeclasname="active"
                className="nav-desktop-item shopping-icon-container"
              >
                <LocalMallOutlined className="shopping-icon" />
                {cart.length > 0 && (
                  <span className="cart-quantity-feedback">{cart.length}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {loader && <Loader />}
    </>
  );
}
