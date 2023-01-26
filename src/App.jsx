import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarAdmin from "./components/NavbarAdmin";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Servicos from "./pages/Servicos";
import Cart from "./pages/Cart";
import Error404 from "./pages/Error404";
import AdminCompras from "./pages/AdminCompras";
import AdminProductos from "./pages/AdminProductos";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { actualizarCart, actualizarProductos } from "./reducer/shoopingReducer";

import { setUser } from "./reducer/userReducer";
import { actualizarCompras } from "./reducer/comprasReducer";
import { LoginAdmin } from "./pages/LoginAdmin";

function App() {
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { user } = state.user;

  useEffect(() => {
    //revisando login del admin
    try {
      const admin = JSON.parse(localStorage.admin);
      dispatch(setUser(admin));
    } catch (error) {}

    //Actualizando productos
    axios
      .get("https://vegetanizando-api.onrender.com/products")
      .then((respuesta) => {
        dispatch(actualizarProductos(respuesta.data));
        setTimeout(() => {
          setModal(false);
        }, 1000);
      })
      .catch();
  }, []);
  useEffect(() => {
    if (user !== null) {
      //actualizo las compras
      axios
        .get("https://vegetanizando-api.onrender.com/compras")
        .then((respuesta) => {
          dispatch(actualizarCompras(respuesta.data));
        })
        .catch();
    } else {
      //revisando cart
      try {
        const cart_local = JSON.parse(localStorage.cartlocal);
        dispatch(actualizarCart(cart_local));
      } catch (error) {}
    }
  }, [user]);

  return (
    <>
      {modal && <Loader />}
      {user ? (
        <HashRouter>
          <NavbarAdmin />
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
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/acerca" element={<About />}></Route>
            <Route exact path="/servicos" element={<Servicos />}></Route>
            <Route exact path="/cart" element={<Cart />}></Route>
            <Route exact path="/admin" element={<LoginAdmin />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </HashRouter>
      )}
      <Footer />
    </>
  );
}

export default App;
