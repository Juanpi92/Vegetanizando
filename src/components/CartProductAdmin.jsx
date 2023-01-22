import React from "react";
import "./CartProductAdmin.css";
import "./CartCompras.css";
import { useSelector } from "react-redux";
import CartItemProductAdmin from "./CartItemProductAdmin";

const CartProductAdmin = () => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  return (
    <>
      <div className="cart_admin_product">
        <div className="table">
          <table className="table_cart">
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th>Porcion</th>
                <th>Preço</th>
                <th>Opcion</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <CartItemProductAdmin product={product} key={product.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CartProductAdmin;
