import React, { useContext } from "react";
import "./styles.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AppContext } from "../../contexts/AppContext";

export default function NavbarAdmin() {
  const state = useSelector((state) => state);

  const { loader } = useContext(AppContext);
  const { user } = state.user;
  console.log(user);

  return (
    <>
      <header className="header-container">
        <h1 className="header-logo-title">
          VEGETANIZAND
          <img
            src={"./imagenes/new-logo.png"}
            alt="Vegetanizando logo"
            className="app-logo"
          />
        </h1>
      </header>
      <header className="header-container-desktop">
        <h1 className="header-logo-title">
          VEGETANIZAND
          <img
            src={"./imagenes/new-logo.png"}
            alt="Vegetanizando logo"
            className="app-logo"
          />
        </h1>
        <nav className="nav-desktop-container">
          <ul className="nav-desktop-content">
            <li>
              <NavLink
                to="/admin/products"
                activeclasname="active"
                className="nav-desktop-item"
              >
                Poductos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/compras"
                activeclasname="active"
                className="nav-desktop-item"
              >
                Compras
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/planes"
                activeclasname="active"
                className="nav-desktop-item"
              >
                Planes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/relatorios"
                activeclasname="active"
                className="nav-desktop-item"
              >
                Relatorios
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="admin-zone-container">
        <h2>Bem-vindo {user.user}</h2>
        <figure className="figure-admin-container">
          <img src={user.photo} alt="admin" className="photo-admin-container" />
        </figure>

        <div className="logout-container">
          <h2>Logout</h2>
          <LogoutOutlinedIcon className="logout-icon" />
        </div>
      </div>
      {loader && <Loader />}
    </>
  );
}
