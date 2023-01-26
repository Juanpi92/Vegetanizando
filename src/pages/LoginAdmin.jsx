import axios from "axios";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducer/userReducer";
import "./LoginAdmin.css";
import LoaderLogin from "../assets/loader_oval.svg";

export const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const $form_login = useRef();
  const $loader = useRef();
  const $errorLogin = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    let usuario = $form_login.current.email.value;
    let senha = $form_login.current.senha.value;
    $loader.current.classList.add("showloader");
    axios
      .get(
        `https://vegetanizando-api.onrender.com/admin?email=${usuario}&password=${senha}`
      )
      .then((respuesta) => {
        if (respuesta.status !== 200) {
          throw {
            statusText: respuesta.statusText,
            status: respuesta.status,
          };
        }
        setTimeout(() => {
          if (respuesta.data.length === 0) {
            $loader.current.classList.remove("showloader");
            $errorLogin.current.innerText = "Usuario o Senha Incorrectos";
          } else {
            $loader.current.classList.remove("showloader");
            dispatch(setUser({ name: "Juanpi" }));
            navigate("/admin/products");
          }
        }, 500);
      })
      .catch((error) => {
        $loader.current.classList.remove("showloader");
        let error_message = error.statusText || "Ocurrio un error";
        $errorLogin.current.innerText = `${error_message}: ${error.status}`;
      });
  };

  return (
    <form className="login" onSubmit={handleSubmit} ref={$form_login}>
      <div className="login__bloco">
        <div className="title_principal">
          <p>Login</p>
        </div>
        <label htmlFor="email" className="login__labelEmail" id="labelEmail">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="login__email"
          placeholder="Digite o seu Email"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
          required
        />
        <br />
        <label htmlFor="senha" className="login__labelSenha" id="labelSenha">
          Senha:
        </label>
        <input
          type="password"
          id="senha"
          className="login__senha"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <div className="loader" ref={$loader}>
        <img src={LoaderLogin} alt="loading" />
      </div>
      <p className="error_login" ref={$errorLogin}></p>
      <input type="submit" value="Login" className="button_principal" />
    </form>
  );
};
