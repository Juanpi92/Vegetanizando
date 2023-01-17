import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Servicos from "./pages/Servicos";
import Cart from "./pages/Cart";
import Error404 from "./pages/Error404";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
