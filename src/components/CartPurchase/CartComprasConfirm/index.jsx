import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { calculateTotalCart, delCart } from "../../../reducer/shoopingReducer";
import { CheckCircle } from "@mui/icons-material";
import { AppContext } from "../../../contexts/AppContext";

const CartComprasConfirm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  const $form_confirm = useRef();
  const $error = useRef();
  const [step, setStep] = useState(0);
  const { setShowModal, windowSize, setActiveDesktopCart } = useContext(AppContext);

  const handleBackButtonClick = () => {
    if (step === 0) {
      if (windowSize.width >= 1280) {
        setActiveDesktopCart(false);
      } else {
        setShowModal(false);
      }
    } else {
      setStep(step - 1)
    }
  }

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
            $form_confirm.current.address.value = `${respuesta.data.logradouro
              }, ${respuesta.data.bairro} ${respuesta.data.complemento || "-"}, ${respuesta.data.localidade
              }, ${respuesta.data.uf} `;
            $error.current.innerText = "";
          } else {
            $error.current.innerText = "Cep inexistente";
          }
        })
        .catch((error) => {
          let error_message = error.statusText || "Ocorreu um erro";
          $error.current.innerText = `${error_message}: ${error.status}`;
        });
    } else {
      $error.current.innerText = "Cep inválido";
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
    <div className="cart-purchase-confirm">
      <CartHeaderSteps step1={step >= 0} step2={step > 0} step3={step == 2} />
      <form
        className="cart-form-register"
        ref={$form_confirm}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="align-form-content">
          {step === 0 &&
            <>
              <div className="form-input-content">
                <label className="form-input-label">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Nome Sobrenome"
                  required
                  name="nome"
                />
              </div>
              <div className="form-input-content">
                <label className="form-input-label">CPF</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  required
                  name="cpf"
                  pattern="^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"
                />
              </div>
              <div className="form-input-content">
                <label className="form-input-label">Email</label>
                <input
                  type="email"
                  placeholder="email@email.com"
                  required
                  pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                  name="email"
                />
              </div>
              <div className="form-input-content">
                <label className="form-input-label">Número celular</label>
                <input
                  type="text"
                  placeholder="(21) 90000-0000"
                  required
                  name="celular"
                />
              </div>
            </>
          }
          {step === 1 &&
            <>
              <div className="form-input-content">
                <label className="form-input-label">CEP</label>
                <div id="input-cep-container">
                  <input
                    type="text"
                    placeholder="00000-000"
                    required
                    pattern="^[0-9]{5}-[0-9]{3}$"
                    name="cep"
                    id="cep-input"
                  />
                  <div id="search-cep" onClick={BuscarCep}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <p className="search-cep-status" ref={$error}></p>
                </div>
              </div>
              <div className="form-input-content" id="adress-content">
                <label className="form-input-label">Endereço</label>
                <input
                  type="text"
                  placeholder="Rua Coliseo 18, Maracanhã - Rio de Janeiro"
                  required
                  id="address"
                  name="address"
                />
              </div>
            </>
          }
        </div>

        <div className="form-actions-content">
          <CartButton value="Voltar" onPress={() => handleBackButtonClick()} />
          {
            step !== 2 ?
              <CartButton value={"Avançar"} onPress={() => step !== 2 && setStep(step + 1)} />
              :
              <CartButton type="submit" value="Finalizar Compra" />
          }
        </div>
      </form >
    </div >
  );
};

export default CartComprasConfirm;

const CartHeaderSteps = ({ step1, step2, step3 }) => {

  return (
    <div className="cart-header-step-container">
      <div className="step-content">
        {step1 ? <CheckCircle /> : <span className="step-number-icon">1</span>}
        <p>Contato</p>
      </div>
      <div className="step-content">
        {step2 ? <CheckCircle /> : <span className="step-number-icon">2</span>}
        <p>Endereço</p>
      </div>
      <div className="step-content">
        {step3 ? <CheckCircle /> : <span className="step-number-icon">3</span>}
        <p>Pagamento</p>
      </div>
    </div>
  )
}

const CartButton = ({ onPress, value, type }) => {

  return (
    <button
      className="button_principal"
      id="form-action-btn"
      style={{ backgroundColor: value === "Finalizar Compra" && "var(--secondary-color)" }}
      type={type ? type : "button"}
      onClick={onPress}>
      {value ? value : "botão"}
    </button>
  )
}