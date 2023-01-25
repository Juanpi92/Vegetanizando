import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducer/userReducer";
import "./LoginAdmin.css"

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
      <form className="login"
        onSubmit={(event) => {
          event.preventDefault();
          axios
            .get(
              "https://vegetanizando-api.onrender.com/admin?email=juan.urgelles92@gmail.com&password=Juanpi22"
            )
            .then((respuesta) => {
              dispatch(setUser({ name: "Juanpi" }));
              navigate("/admin/products");
            })
            .catch((error) => {
              console.log("error");
            });
        }}
      >
        {/*  Login antigo
        <input type="text" />
        <br />
        <br />
        <input type="text" />
        <br />
        <br />
        */}
        <div className="login__bloco">
        <label htmlFor="email" className="login__labelEmail" id='labelEmail'>Email:</label>
            <input type="email" id="email"  className="login__email" placeholder="Digite o seu Email" pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required/> <br />
          <label htmlFor="senha" className="login__labelSenha" id='labelSenha'>Senha:</label>
            <input type="text" id="senha" className="login__senha" placeholder="Digite sua senha" required/>
        </div>   
        <input type="submit" value="Login" className="login__button"/>
      </form>
  );
};

export default LoginAdmin;