import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  RemoveRedEyeOutlined,
  PictureAsPdfOutlined,
  ClearOutlined,
} from "@mui/icons-material";
import { actStatus, delFromCompras } from "../../reducer/comprasReducer";

const AdminCompras = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);
  const state = useSelector((state) => state);
  const { user } = state.user;
  const { compras } = state.compras;

  return (
    <>
      <div className="page_admin_compras">
        <div className="admin-compras-container">
          <table className="table-compras-content">
            <thead>
              <tr>
                <th>id</th>
                <th>Cliente</th>
                <th>Endereço</th>
                <th>Status</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="admin-compras-content">
              {compras.map((compra) => (
                <ComprasListItem compra={compra} key={compra._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const ComprasListItem = ({ compra }) => {
  let { _id, user, address, status, totalCart } = compra;
  const state = useSelector((state) => state);
  const userAdmin = state.user;
  const dispatch = useDispatch();
  let option_status = useRef(null);
  useEffect(() => {
    console.log(status);
    option_status.current.value = status;
  }, []);

  const handleChange = async (e, _id) => {
    try {
      const options = {
        method: "PATCH",
        url: `https://vegetanizando-api.vercel.app/purchase/${_id}`,
        headers: {
          "Content-Type": "application/json",
          "auth-token": userAdmin.user.token,
        },
        data: { status: e.target.value },
      };

      await axios.request(options);
      dispatch(actStatus({ id: _id, status: e.target.value }));
    } catch (error) {}
  };
  const handleDelete = async (_id) => {
    try {
      const options = {
        method: "DELETE",
        url: `https://vegetanizando-api.vercel.app/purchase/${_id}`,
        headers: {
          "Content-Type": "application/json",
          "auth-token": userAdmin.user.token,
        },
      };

      await axios.request(options);
      dispatch(delFromCompras(_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{user}</td>
      <td>{address}</td>
      <td className="status_container">
        <select
          id="selected_option"
          ref={option_status}
          onChange={(e) => {
            handleChange(e, _id);
          }}
        >
          <option value="solicitado">Solicitado</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
        </select>
      </td>
      <td>R$ {totalCart}</td>
      <td className="option">
        <RemoveRedEyeOutlined className="option_icon" />
        <PictureAsPdfOutlined className="option_icon" />
        <ClearOutlined
          className="delete_icon"
          onClick={() => {
            handleDelete(_id);
          }}
        />
      </td>
    </tr>
  );
};

export default AdminCompras;
