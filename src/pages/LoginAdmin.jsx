import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducer/userReducer";

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div style={{ margin: "100px 350px" }}>
      <form
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
        <input type="text" />
        <br />
        <br />
        <input type="text" />
        <br />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginAdmin;
