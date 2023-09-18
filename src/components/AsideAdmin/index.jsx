import React, { useContext } from "react";
import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { delUser } from "../../reducer/userReducer";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AppContext } from "../../contexts/AppContext";
import {
  AddBusinessOutlined,
  AnalyticsOutlined,
  CurrencyExchangeOutlined,
  InventoryOutlined,
} from "@mui/icons-material";

export default function AsideAdmin() {
  const state = useSelector((state) => state);

  const { loader } = useContext(AppContext);
  const { user } = state.user;

  return (
    <>
      <aside className="dashboard-navigation">
        <div className="dashboard-logo-container">
          <h1 className="dashboard-logo-title">VEGETANIZAND</h1>
          <img
            src={"./imagenes/new-logo.png"}
            alt="Vegetanizando logo"
            className="app-logo"
          />
        </div>
        <nav className="dashboard-nav-container">
          <ul className="dashboard-nav-content">
            <li>
              <NavLink
                to="/admin/products"
                activeclassname="active"
                className="dashboard-nav-link"
              >
                <AddBusinessOutlined
                  style={{ fontSize: 30 }}
                  className="nav-link-icon"
                />
                <span className="nav-link-name">Produtos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/compras"
                activeclassname="active"
                className="dashboard-nav-link"
              >
                <CurrencyExchangeOutlined
                  style={{ fontSize: 30 }}
                  className="nav-link-icon"
                />
                <span className="nav-link-name">Compras</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/plans"
                activeclassname="active"
                className="dashboard-nav-link"
              >
                <InventoryOutlined
                  style={{ fontSize: 30 }}
                  className="nav-link-icon"
                />
                <span className="nav-link-name">Planos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/statistics"
                activeclassname="active"
                className="dashboard-nav-link"
              >
                <AnalyticsOutlined
                  style={{ fontSize: 30 }}
                  className="nav-link-icon"
                />
                <span className="nav-link-name">Relatórios</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        {loader && <Loader />}
      </aside>
      <UserAgent data={user} />
    </>
  );
}

function UserAgent({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(delUser());
    navigate("/");
  };

  return (
    <div className="admin-agent-container">
      <div className="admin-agent-greetings">
        <h2>
          Bem-vindo, <span className="user-name">{data.user}</span>!
        </h2>
        <img
          src={data.photo}
          alt="admin picture"
          className="admin-agent-photo"
        />
      </div>

      <div className="admin-logout-content">
        <button className="admin-logout-btn" onClick={handleLogout}>
          <span>Encerrar Sessão</span>
          <LogoutOutlinedIcon className="admin-logout-icon" />
        </button>
      </div>
    </div>
  );
}
