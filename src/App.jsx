import { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  actualizarCart,
  actualizarProductos,
  calculateTotalCart,
} from "./reducer/shoopingReducer";

import { setUser } from "./reducer/userReducer";
import { actualizarCompras } from "./reducer/comprasReducer";
import Header from "./components/Header";
import NavigationMobile from "./components/NavigationMobile";
import PurchaseModal from "./components/PurchaseModal";
import { AppProvider } from "./contexts/AppContext";
import CartComprasConfirm from "./components/CartPurchase/CartComprasConfirm";
import ScrollToTop from "./components/ScrollToTop";
import AsideAdmin from "./components/AsideAdmin";
import { setPlans } from "./reducer/plansReducer";
import Alert from "./components/Alert";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";

function App() {
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
    <AnimatePresence>
      <HashRouter>
        <AppProvider>
          <ScrollToTop />
          <Alert />
          {
            user ?
              <>
                <AsideAdmin />
                <AppRoutes variant={'private'} />
              </>
              :
              <>
                <Header />
                <NavigationMobile />
                <AppRoutes variant={'public'} />
                <PurchaseModal children={<CartComprasConfirm />} />
                <Footer />
              </>
          }
        </AppProvider>
      </HashRouter>
    </AnimatePresence>
  );
}

export default App;
