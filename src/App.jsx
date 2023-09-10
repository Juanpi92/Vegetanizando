import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Servicos from "./pages/Servicos";
import Cart from "./pages/Cart";
import Error404 from "./pages/Error404";
import AdminCompras from "./pages/AdminCompras";
import AdminProductos from "./pages/AdminProductos";
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

function App() {
  const [plan, setPlan] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { user } = state.user;

  useEffect(() => {
    //revisando login del admin
    try {
      const admin = JSON.parse(localStorage.admin);
      dispatch(setUser(admin));
    } catch (error) { }

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
    if (user !== null) {
      //actualizo las compras
      axios
        .get("https://vegetanizando-api.onrender.com/compras")
        .then((respuesta) => {
          dispatch(actualizarCompras(respuesta.data));
          console.log(respuesta.data);
        })
        .catch();
    } else {
      //revisando cart
      try {
        const cart_local = JSON.parse(localStorage.cartlocal);
        dispatch(actualizarCart(cart_local));
        dispatch(calculateTotalCart());
      } catch (error) { }
    }
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
        setPlan(response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    })();
  }, []);

  return (
    <>
      {user ? (
        <HashRouter>
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
              element={<AdminProductos />}
            ></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </HashRouter>
      ) : (
        <HashRouter>
          <AppProvider>
            <Header />
            <NavigationMobile />
            <ScrollToTop />
            <PurchaseModal children={<CartComprasConfirm />} />
            <Routes>
              <Route exact path="/" element={<Home meal_plan={plan} />}></Route>
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
