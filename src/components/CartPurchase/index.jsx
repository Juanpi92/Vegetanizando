import React, { useContext } from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import CartItem from './CartItem'
import { useNavigate } from "react-router";
import { AppContext } from "../../contexts/AppContext";

const CartPurchase = ({ setCompraShow }) => {
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  const navigate = useNavigate();

  const HandleComprar = () => {
    if (cart.length === 0) {
      return alert("O seu cart esta vazio ainda");
    }
    setCompraShow(false);
  };

  return (
    <article className="cart-purchase-container">
      <div className="cart-purchase-title">
        <p>Minha sacola</p>
      </div>
      <div className="cart-table-align">
        <table className="cart-table-container">
          <tbody className="cart-table-content">
            {cart.map((cartItem) => (
              <CartItem data={cartItem} key={cartItem.id} />
            ))}
          </tbody>
        </table>
      </div>
      <PurchaseFooter total={totalCart} onBack={() => navigate('/')} onPress={HandleComprar} />
    </article>
  );
};

export default CartPurchase;

const PurchaseFooter = ({ total, onPress, onBack}) => {
  const { setShowModal } = useContext(AppContext);

  const onCheckoutRequest = () => {
    // onPress();
    setShowModal(true);
  }

  return (
    <div className="purchase-info-container">
      <span onClick={onBack}>Continuar comprando</span>
      <div className="align-right-content">
        <p>Subtotal: <span>R${total.toFixed(2)}</span></p>
        <button className="button_principal" id="cart-purchase-btn" onClick={onCheckoutRequest}>
          Finalizar Compra
        </button>
      </div>
    </div>
  )
}