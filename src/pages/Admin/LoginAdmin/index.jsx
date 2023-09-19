import axios from "axios";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../reducer/userReducer";
import "./styles.css";
import LoaderLogin from "../../../assets/loader_oval.svg";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

export default function LoginAdmin () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const $form_login = useRef();
  const $loader = useRef();
  const $errorLogin = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let email = $form_login.current.email.value;
    let senha = $form_login.current.senha.value;
    $errorLogin.current.innerText = "";
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
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        ref={$form_login}
        className="form_container"
      >
        <div className="title_principal">
          <p>Login</p>
        </div>
        <div className="input-container">
          <AssignmentIndOutlinedIcon
            style={{
              backgroundColor: "#10aa10",
              height: "40px",
              width: "40px",
              padding: "0 2px",
              color: "#ffff",
            }}
          />
          <input
            type="email"
            id="email"
            className="login__email"
            placeholder="Digite o seu Email"
            //pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
            required
          />
        </div>
        <div className="input-container">
          <LockOpenOutlinedIcon
            style={{
              backgroundColor: "#10aa10",
              height: "40px",
              width: "40px",
              padding: "0 2px",
              color: "#ffff",
            }}
          />
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
        <input type="submit" value="Login" className="login" />
      </form>
    </div>
  );
};
