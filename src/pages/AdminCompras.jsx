import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../components/CartCompras.css";
import CartComprasAdmin from "../components/CartComprasAdmin";
import ModalComprasAdmin from "../components/ModalComprasAdmin";

const AdminCompras = () => {
  const [comprasModal, setComprasModal] = useState({
    cart: [],
    totalCart: 0,
    usuario: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);
  const state = useSelector((state) => state);
  const { user } = state.user;
  const { compras } = state.compras;
  const $modalCompra = useRef();

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
                  <CartComprasAdmin
                    data={compra}
                    key={compra.id}
                    setComprasModal={setComprasModal}
                    $modalCompra={$modalCompra}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalComprasAdmin
        comprasModal={comprasModal}
        $modalCompra={$modalCompra}
      />
    </>
  );
};

export default AdminCompras;
