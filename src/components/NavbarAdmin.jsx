import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../imagenes/new-logo.png";
import { useDispatch } from "react-redux";
import { delUser, setUser } from "../reducer/userReducer";

const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const $links = useRef();
  const HandleClick = () => {
    $links.current.classList.toggle("link_active");
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
              <NavLink to="/admin/products" activeclassname="active">
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/compras" activeclassname="active">
                Compras
              </NavLink>
            </li>
            <button
              className="logout"
              onClick={(event) => {
                event.preventDefault();
                dispatch(delUser());
                navigate("/");
              }}
            >
              Logout <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
