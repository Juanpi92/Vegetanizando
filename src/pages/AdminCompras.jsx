import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actualizarCompras } from "../reducer/comprasReducer";
import "../components/CartCompras.css";
import CartComprasAdmin from "../components/CartComprasAdmin";

const AdminCompras = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
    axios
      .get("https://vegetanizando-api.onrender.com/compras")
      .then((respuesta) => {
        dispatch(actualizarCompras(respuesta.data));
      })
      .catch();
  }, []);
  const state = useSelector((state) => state);
  const { user } = state.user;
  const { compras } = state.compras;

  return (
    <>
      <div className="container_principal">
        <div className="container_cart">
          <div className="title_principal">
            <p>Compras Realizadas</p>
          </div>
          <div className="table">
            <table className="table_cart">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>CPF</th>
                  <th>Endereco</th>
                  <th>Total</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => (
                  <CartComprasAdmin data={compra} key={compra.id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCompras;
