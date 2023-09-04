import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./CartCompras.css";
import "./CartComprasConfirm.css";
import { calculateTotalCart, delCart } from "../reducer/shoopingReducer";
import { useRef } from "react";
import { useEffect } from "react";

const CartComprasConfirm = ({ setCompraShow }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  const $form_confirm = useRef();
  const $error = useRef();
  const BuscarCep = () => {
    $form_confirm.current.address.value = "-";
    const expreg_cep = /^[0-9]{5}-[0-9]{3}$/;
    if (expreg_cep.test($form_confirm.current.cep.value)) {
      let cep = $form_confirm.current.cep.value.replace("-", "");
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/ `)
        .then((respuesta) => {
          if (respuesta.status !== 200) {
            throw {
              statusText: respuesta.statusText,
              status: respuesta.status,
            };
          }

          if (respuesta.data.erro !== true) {
            $form_confirm.current.address.value = `${
              respuesta.data.logradouro
            }, ${respuesta.data.bairro} ${respuesta.data.complemento || "-"}, ${
              respuesta.data.localidade
            }, ${respuesta.data.uf} `;
            $error.current.innerText = "";
          } else {
            $error.current.innerText = "cep no existe";
          }
        })
        .catch((error) => {
          let error_message = error.statusText || "Ocurrio un error";
          $error.current.innerText = `${error_message}: ${error.status}`;
        });
    } else {
      $error.current.innerText = "cep no valido";
    }
  };

  const handleSubmit = (event) => {
    //Realizar insercion de las opciones de compra en el server
    let address = $form_confirm.current.addresss.value;

    let data = {
      usuario: $form_confirm.current.nome.value,
      cpf: $form_confirm.current.cpf.value,
      address: `${address}`,
      cart: cart,
      totalCart: totalCart,
    };
    axios
      .post("https://vegetanizando-api.onrender.com/compras", data)
      .then((respuesta) => {
        dispatch(delCart());
        dispatch(calculateTotalCart());
        alert("Obrigado pela compra, disfrute sua comida");
      })
      .catch((error) => {
        alert("Ocurrio un Error al realizar la compra");
      });
    setCompraShow(true);
  };

  return (
    <div className="container_cart container_confirm">
      <div className="title_principal">
        <p>Confirme sua Compra</p>
      </div>
      <div className="content">
        <form
          id="formulario_cadastro"
          ref={$form_confirm}
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="user-details">
            <div className="input-box">
              <span className="details">Nome Completo</span>
              <input
                type="text"
                placeholder="Digite seu nome"
                required
                name="nome"
              />
            </div>
            <div className="input-box">
              <span className="details">CPF</span>
              <input
                type="text"
                placeholder="Digite seu CPF: XXX.XXX.XXX-XX"
                required
                name="cpf"
                pattern="^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                required
                pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                name="email"
              />
            </div>

            <div className="input-box">
              <span className="details">Número celular</span>
              <input
                type="text"
                placeholder="Digite seu número"
                required
                name="celular"
              />
            </div>
            <div className="input-box cep_container">
              <span className="details">CEP</span>
              <div className="cep">
                <input
                  type="text"
                  placeholder="Digite seu cep: XXXXX-XXX"
                  required
                  pattern="^[0-9]{5}-[0-9]{3}$"
                  name="cep"
                  id="cep"
                />
                <div className="buscar_cep" onClick={BuscarCep}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
              <p className="error" ref={$error}></p>
            </div>
            <div className="input-box">
              <span className="details">Rua</span>
              <input
                type="text"
                placeholder="Digite seu endereço"
                required
                id="address"
                name="address"
              />
            </div>
          </div>
          <div></div>
          <div className="botones_confirmar">
            <button
              className="button_principal"
              onClick={() => {
                setCompraShow(true);
              }}
            >
              Voltar
            </button>
            <input
              type="submit"
              value="Confirmar"
              className="button_principal"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartComprasConfirm;
