import React, { useContext } from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import CartItem from './CartItem'
import { useNavigate } from "react-router";
import { AppContext } from "../../contexts/AppContext";
import CartComprasConfirm from './CartComprasConfirm/index';
import { RotateLeft } from "@mui/icons-material";

const CartPurchase = ({ setCompraShow }) => {
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  const { setShowModal, activeDesktopCart, setActiveDesktopCart } = useContext(AppContext);
  const navigate = useNavigate();

  const HandleComprar = () => {
    if (cart.length === 0) {
      return alert("O seu cart esta vazio ainda");
    }
    setCompraShow(false);
  };

  return (
    <article className="purchase-general-container">
      <section className="cart-purchase-container">
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
        <PurchaseFooter active={activeDesktopCart} total={totalCart} onBack={() => navigate('/')} onPress={HandleComprar} />
      </section>
      <aside className="aside-purchase-container" id={activeDesktopCart && "active-cart"}>
        <CartComprasConfirm />
      </aside>
      <div className="purchase-overlay" onClick={() => setActiveDesktopCart(false)} id={activeDesktopCart && "active-cart"}></div>
    </article>
  );
};

export default CartPurchase;

const PurchaseFooter = ({ total, onPress, onBack, active }) => {
  const { setShowModal, activeDesktopCart, setActiveDesktopCart, windowSize } = useContext(AppContext);

  const onCheckoutRequest = () => {
    // onPress();
    if (windowSize.width >= 1280) {
      setActiveDesktopCart(true);
      setShowModal(false);
    } else {
      setActiveDesktopCart(false);
      setShowModal(true);
    }
    window.scrollTo(0, 0);
  }

  return (
    <div className="purchase-info-container">
      <span onClick={onBack}>Continuar comprando</span>
      <div className="align-right-content">
        <p>Subtotal: <span>R${total.toFixed(2)}</span></p>
        <button className="button_principal" id="cart-purchase-btn" onClick={onCheckoutRequest}>
          {activeDesktopCart ? <RotateLeft /> : "Finalização de Compra"}
        </button>
      </div>
    </div>
  )
}