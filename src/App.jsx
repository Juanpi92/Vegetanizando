import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Servicos from "./pages/Servicos";
import Cart from "./pages/Cart";
import Error404 from "./pages/Error404";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { actualizarCart, actualizarProductos } from "./reducer/shoopingReducer";

function App() {
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const cart_local = JSON.parse(localStorage.cartlocal);
      dispatch(actualizarCart(cart_local));
    } catch (error) {
      console.log("no pude actualizar");
    }
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

  return (
    <>
      {modal && <Loader />}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/acerca" element={<About />}></Route>
          <Route exact path="/servicos" element={<Servicos />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
