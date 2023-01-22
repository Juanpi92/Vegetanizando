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
          dispatch(setUser({ name: "Juanpi" }));
          navigate("/admin/products");
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
