import React from "react";
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
    $form_confirm.current.rua.value = "-";
    $form_confirm.current.numero.value = "-";
    $form_confirm.current.bairro.value = "-";
    $form_confirm.current.complemento.value = "-";
    $form_confirm.current.cidade.value = "-";
    $form_confirm.current.estado.value = "-";
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
            $form_confirm.current.rua.value = respuesta.data.logradouro;
            $form_confirm.current.bairro.value = respuesta.data.bairro;
            $form_confirm.current.complemento.value =
              respuesta.data.complemento || "-";
            $form_confirm.current.cidade.value = respuesta.data.localidade;
            $form_confirm.current.estado.value = respuesta.data.uf;
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
    let rua = $form_confirm.current.rua.value;
    let numero = $form_confirm.current.numero.value;
    let bairro = $form_confirm.current.bairro.value;
    let complemento = $form_confirm.current.complemento.value;
    let cidade = $form_confirm.current.cidade.value;
    let estado = $form_confirm.current.estado.value;

    let data = {
      usuario: $form_confirm.current.nome.value,
      cpf: $form_confirm.current.cpf.value,
      address: `${rua} ${numero}, ${complemento}, ${bairro}, ${cidade}. ${estado}`,
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
                placeholder="Digite sua rua"
                required
                id="rua"
                name="rua"
              />
            </div>
            <div className="input-box">
              <span className="details">Numero</span>
              <input
                type="text"
                placeholder="Digite o numero"
                required
                name="numero"
              />
            </div>
            <div className="input-box">
              <span className="details">Bairro</span>
              <input
                type="text"
                placeholder="Digite seu bairro"
                required
                name="bairro"
              />
            </div>
            <div className="input-box">
              <span classname="details">Complemento</span>
              <input
                type="text"
                placeholder="Digite o complemento"
                name="complemento"
              />
            </div>
            <div className="input-box">
              <span className="details">Cidade</span>
              <input
                type="text"
                placeholder="Digite sua cidade"
                required
                name="cidade"
              />
            </div>
            <div className="input-box">
              <span className="details">Estado</span>
              <input
                type="text"
                placeholder="Digite seu estado"
                required
                name="estado"
              />
            </div>

            <div className="input-box">
              <span className="details">Tarjeta de Credito</span>
              <input
                type="text"
                placeholder="Digite sua tarjeta: XXXXXXXXXXXXXXXX"
                required
                name="senha"
                pattern="^[0-9]{16}$"
              />
            </div>
            <div className="input-box">
              <span className="details">Codigo de Segurança</span>
              <input
                type="password"
                placeholder="Confirme com codigo de segurança:XXX"
                required
                name="confirm_senha"
                pattern="^[0-9]{3}$"
              />
            </div>
          </div>

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
