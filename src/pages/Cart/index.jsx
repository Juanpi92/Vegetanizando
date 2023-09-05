import React, { useState } from "react";
import CartComprasConfirm from "../../components/CartPurchase/CartComprasConfirm";
import CartPurchase from '../../components/CartPurchase';
import './styles.css'
import { useSelector } from "react-redux";
import { LocalMallOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [compraShow, setCompraShow] = useState(true);
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { cart } = state.shopping;

  return (
    <main className="cart-container">
      {cart.length > 0 ?
        compraShow && (
          <CartPurchase setCompraShow={setCompraShow} />
        )
        :
        <CartEmptyFeedback onBack={() => navigate('/')} />
      }
    </main>
  );
};

export default Cart;

const CartEmptyFeedback = ({ onBack }) => {
  return (
    <article className="cart-empty-container">
      <LocalMallOutlined />
      <h3>Sua sacola de compras está vazia, vamos as compras?</h3>
      <button className="button_principal" id="cart-purchase-btn" onClick={onBack}>
        Ver produtos
      </button>
    </article>
  )
}
