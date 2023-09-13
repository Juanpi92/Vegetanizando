import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { PictureAsPdfOutlined, ClearOutlined } from "@mui/icons-material";
import { actStatus, delFromCompras } from "../../reducer/comprasReducer";
import jsPDF from "jspdf";
import { htmlToText } from "html-to-text";

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
                <th>data</th>
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
  let { _id, user, date, address, status, totalCart } = compra;
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

  const generatePDF = async (compra) => {
    const inicio = `
    <h1 style="text-align: center;"><b>Recibo de compra</b></h1>
    <p>ID do pedido: ${compra._id}</p>
    <p>Nome do cliente: ${compra.user}</p>
    <p>E-mail: ${compra.email}</p>
    <p>Telefone: ${compra.celphone}</p>
    <p>CPF: ${compra.cpf}</p>
    <p>Endereço de entrega: ${compra.address}</p>
    <p>Status do pedido: ${compra.status}</p>
    <p>Data da compra: ${new Date(compra.date).toLocaleDateString()}</p>
    <h2>Detalhes do pedido</h2>
       <ul>`;
    let produtos = compra.cart.map(
      (item) => `
        <li>${item.name}----<span>R$ ${item.price.toFixed(2)}x${
        item.quantity
      }</span> <span>=R$ ${(item.price * parseInt(item.quantity)).toFixed(
        2
      )}</span></li>`
    );

    let footer = `
     </ul>
    <p>Total do pedido: R$ ${compra.totalCart.toFixed(2)}</p>
  `;

    try {
      const opciones = {
        wordwrap: 30,
        unit: "mm",
        format: [80, 210], // Tamaño de hoja de 80 mm de ancho y 210 mm de alto
        fontSize: 10, // Tamaño de letra
      };
      let pdfContent = inicio + produtos + footer;

      const html = htmlToText(pdfContent);
      const doc = new jsPDF(opciones);
      doc.text(html, 5, 10);
      doc.save(`${compra._id}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{user}</td>
      <td>{new Date(date).toLocaleString()}</td>
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
        <PictureAsPdfOutlined
          className="option_icon"
          onClick={() => {
            generatePDF(compra);
          }}
        />
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
