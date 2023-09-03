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
  const handleSubmit = async (event) => {
    event.preventDefault();
    let email = $form_login.current.email.value;
    let senha = $form_login.current.senha.value;
    $loader.current.classList.add("showloader");
    try {
      const options = {
        method: "POST",
        url: "https://vegetanizando-api.vercel.app/login",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: { email: email, password: senha },
      };
      let response = await axios.request(options);
      setTimeout(() => {
        dispatch(setUser(response.data));
        $loader.current.classList.remove("showloader");
        navigate("/admin/products");
      }, 500);
    } catch (error) {
      $loader.current.classList.remove("showloader");
      if (error.response.status === 401) {
        return ($errorLogin.current.innerText = "Usuario ou senha errada");
      } else {
        return ($errorLogin.current.innerText =
          "Ocurreu um error. Intente de novo");
      }
    }
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
