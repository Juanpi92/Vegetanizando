import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Servicos from "./pages/Servicos";
import Cart from "./pages/Cart";
import Error404 from "./pages/Error404";
import AdminCompras from "./pages/AdminCompras";
import AdminProducts from "./pages/AdminProducts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  actualizarCart,
  actualizarProductos,
  calculateTotalCart,
} from "./reducer/shoopingReducer";

import { setUser } from "./reducer/userReducer";
import { actualizarCompras } from "./reducer/comprasReducer";
import { LoginAdmin } from "./pages/LoginAdmin";
import Header from "./components/Header";
import NavigationMobile from "./components/NavigationMobile";
import PurchaseModal from "./components/PurchaseModal";
import { AppProvider } from "./contexts/AppContext";
import CartComprasConfirm from "./components/CartPurchase/CartComprasConfirm";
import ScrollToTop from "./components/ScrollToTop";
import AsideAdmin from "./components/AsideAdmin";
import Statistics from "./pages/Statistics";
import { setPlans } from "./reducer/plansReducer";
import AdminPlans from "./pages/AdminPlans";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { user } = state.user;

  useEffect(() => {
    //revisando login del admin
    try {
      const admin = JSON.parse(localStorage.admin);
      dispatch(setUser(admin));
    } catch (error) {}

    (async () => {
      try {
        // Obtener los productos
        const options = {
          method: "GET",
          url: "https://vegetanizando-api.vercel.app/products",
        };

        const respuesta = await axios.request(options);
        dispatch(actualizarProductos(respuesta.data));
      } catch (error) {
        console.log(error);
        // Manejar el error aquí si es necesario
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user !== null) {
          // Actualizando las compras
          const options = {
            method: "GET",
            url: "https://vegetanizando-api.vercel.app/purchases",
            headers: {
              "Content-Type": "application/json",
              "auth-token": user.token,
            },
          };
          let response = await axios.request(options);
          dispatch(actualizarCompras(response.data));
        } else {
          // Revisando el carrito
          const cart_local = JSON.parse(localStorage.cartlocal);
          dispatch(actualizarCart(cart_local));
          dispatch(calculateTotalCart());
        }
      } catch (error) {
        // Manejar errores aquí
        console.error(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        url: "https://vegetanizando-api.vercel.app/plans",
        headers: { "Content-Type": "application/json" },
      };

      try {
        const response = await axios.request(options);
        dispatch(setPlans(response.data));
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    })();
  }, []);

  return (
    <>
      {user ? (
        <HashRouter>
          <AppProvider>
            <AsideAdmin />
            <Routes>
              <Route
                exact
                path="/admin/compras"
                element={<AdminCompras />}
              ></Route>
              <Route
                exact
                path="/admin/products"
                element={<AdminProducts />}
              ></Route>
              <Route exact path="/admin/plans" element={<AdminPlans />}></Route>
              <Route
                exact
                path="/admin/statistics"
                element={<Statistics />}
              ></Route>
              <Route path="*" element={<Error404 />}></Route>
            </Routes>
          </AppProvider>
        </HashRouter>
      ) : (
        <HashRouter>
          <AppProvider>
            <Header />
            <NavigationMobile />
            <ScrollToTop />
            <PurchaseModal children={<CartComprasConfirm />} />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/acerca" element={<About />}></Route>
              <Route exact path="/servicos" element={<Servicos />}></Route>
              <Route exact path="/cart" element={<Cart />}></Route>
              <Route exact path="/admin" element={<LoginAdmin />}></Route>
              <Route path="*" element={<Error404 />}></Route>
            </Routes>
            <Footer />
          </AppProvider>
        </HashRouter>
      )}
    </>
  );
}

export default App;
