import React, { useState } from "react";
import CartCompras from "../components/CartCompras";
import CartComprasConfirm from "../components/CartComprasConfirm";

const Cart = () => {
  const [compraShow, setCompraShow] = useState(true);
  return (
    <>
      <div className="container_principal">
        {compraShow ? (
          <CartCompras setCompraShow={setCompraShow} />
        ) : (
          <CartComprasConfirm setCompraShow={setCompraShow} />
        )}
      </div>
    </>
  );
};

export default Cart;
