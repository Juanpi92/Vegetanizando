import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import shopping_bag from "../../../assets/shopping-bag.png";
import Cards from "react-credit-cards-2";
import "./styles.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import InputElement from "react-input-mask/lib/react-input-mask.development";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalCart, delCart } from "../../../reducer/shoopingReducer";
import { CheckCircle } from "@mui/icons-material";
import { AppContext } from "../../../contexts/AppContext";
import { purchase } from "./purchase";

const CartComprasConfirm = () => {
  const [userData, setUserData] = useState({
    nome: "",
    cep: "",
    email: "",
    celular: "",
    address: "",
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, totalCart } = state.shopping;
  const $form_confirm = useRef();
  const $error = useRef();
  const [step, setStep] = useState(0);
  const { setShowModal, windowSize, setActiveDesktopCart } =
    useContext(AppContext);

  const handleBackButtonClick = () => {
    if (step === 0) {
      if (windowSize.width >= 1280) {
        setActiveDesktopCart(false);
      } else {
        setShowModal(false);
      }
    } else {
      setStep(step - 1);
    }
  };

  const HandleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAvancar = () => {
    let regCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
    let regEmail =
      /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
    let regCel = /^[0-9]+$/;
    let regCep = /^[0-9]{5}-[0-9]{3}$/;

    if (step === 0) {
      $form_confirm.current.nome.style.borderBottomColor = "#C3C3C3";
      $form_confirm.current.cpf.style.borderBottomColor = "#C3C3C3";
      $form_confirm.current.email.style.borderBottomColor = "#C3C3C3";
      $form_confirm.current.celular.style.borderBottomColor = "#C3C3C3";
      if ($form_confirm.current.nome.value === "") {
        $form_confirm.current.nome.style.borderBottomColor = "red";
        return;
      }
      if (
        $form_confirm.current.cpf.value === "" ||
        !regCpf.test($form_confirm.current.cpf.value)
      ) {
        $form_confirm.current.cpf.style.borderBottomColor = "red";
        return;
      }
      if (
        $form_confirm.current.email.value === "" ||
        !regEmail.test($form_confirm.current.email.value)
      ) {
        $form_confirm.current.email.style.borderBottomColor = "red";
        return;
      }
      if (
        $form_confirm.current.celular.value === "" ||
        !regCel.test($form_confirm.current.celular.value)
      ) {
        $form_confirm.current.celular.style.borderBottomColor = "red";
        return;
      }
    }
    if (step === 1) {
      $form_confirm.current.cep.style.borderBottomColor = "#C3C3C3";
      $form_confirm.current.address.style.borderBottomColor = "#C3C3C3";
      if (
        $form_confirm.current.cep.value === "" ||
        !regCep.test($form_confirm.current.cep.value)
      ) {
        $form_confirm.current.cep.style.borderBottomColor = "red";
        return;
      }
      if (
        $form_confirm.current.address.value === "" ||
        $form_confirm.current.address.value === "-"
      ) {
        $form_confirm.current.address.style.borderBottomColor = "red";
        return;
      }
    }
    step !== 2 && setStep(step + 1);
  };

  const BuscarCep = () => {
    setUserData({
      ...userData,
      address: "-",
    });
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
            setUserData({
              ...userData,
              address: `${respuesta.data.logradouro}, ${
                respuesta.data.bairro
              } ${respuesta.data.complemento || "-"}, ${
                respuesta.data.localidade
              }, ${respuesta.data.uf} `,
            });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let regNumber = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;
    let regExp = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    let regCvc = /^[0-9]{3}$/;
    let regCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
    $form_confirm.current.name.style.borderBottomColor = "#C3C3C3";
    $form_confirm.current.number.style.borderBottomColor = "#C3C3C3";
    $form_confirm.current.expiry.style.borderBottomColor = "#C3C3C3";
    $form_confirm.current.cvc.style.borderBottomColor = "#C3C3C3";
    $form_confirm.current.CPF.style.borderBottomColor = "#C3C3C3";
    if ($form_confirm.current.name.value === "") {
      $form_confirm.current.name.style.borderBottomColor = "red";
      return;
    }
    if (
      $form_confirm.current.number.value === "" ||
      !regNumber.test($form_confirm.current.number.value)
    ) {
      $form_confirm.current.number.style.borderBottomColor = "red";
      return;
    }
    if (
      $form_confirm.current.expiry.value === "" ||
      !regExp.test($form_confirm.current.expiry.value)
    ) {
      $form_confirm.current.expiry.style.borderBottomColor = "red";
      return;
    }
    if (
      $form_confirm.current.cvc.value === "" ||
      !regCvc.test($form_confirm.current.cvc.value)
    ) {
      $form_confirm.current.cvc.style.borderBottomColor = "red";
      return;
    }
    if (
      $form_confirm.current.CPF.value === "" ||
      !regCpf.test($form_confirm.current.CPF.value)
    ) {
      $form_confirm.current.CPF.style.borderBottomColor = "red";
      return;
    }
    try {
      //loading
      await purchase(userData, cardDetails, cart, totalCart);
      setActiveDesktopCart(false);
      setShowModal(false);
      dispatch(delCart());
      //end of loading
    } catch (error) {
      //end of loading
      setActiveDesktopCart(false);
      setShowModal(false);
      //error alert
    }
  };

  const data = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    CPF: "",
  };

  const [cardDetails, setCardDetails] = useState(data);

  const handleInputFocus = (e) => {
    setCardDetails({ ...cardDetails, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
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
          {step === 0 && (
            <>
              <div className="form-input-content">
                <label className="form-input-label">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Nome Sobrenome"
                  required
                  name="nome"
                  value={userData.nome}
                  onChange={HandleUserInfoChange}
                />
              </div>
              <div className="form-input-content">
                <label className="form-input-label">CPF</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  required
                  name="cpf"
                  value={userData.cpf}
                  onChange={HandleUserInfoChange}
                />
              </div>
              <div className="form-input-content">
                <label className="form-input-label">Email</label>
                <input
                  type="email"
                  placeholder="email@email.com"
                  required
                  name="email"
                  value={userData.email}
                  onChange={HandleUserInfoChange}
                />
              </div>
              <div className="form-input-content">
                <label className="form-input-label">Número celular</label>
                <input
                  type="text"
                  placeholder="(21) 90000-0000"
                  required
                  name="celular"
                  value={userData.celular}
                  onChange={HandleUserInfoChange}
                />
              </div>
            </>
          )}
          {step === 1 && (
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
                    value={userData.cep}
                    onChange={HandleUserInfoChange}
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
                  value={userData.address}
                  onChange={HandleUserInfoChange}
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="form-payment-title">Detalhes do Cartão</h3>
              <div className="form-card-content">
                <div className="card-align-creative-content">
                  <div className="card-animation-content">
                    <Cards
                      cvc={cardDetails.cvc}
                      expiry={cardDetails.expiry}
                      focused={cardDetails.focus}
                      name={cardDetails.name}
                      number={cardDetails.number}
                      cpf={cardDetails.cpf}
                      placeholders={{
                        name: "SEU NOME AQUI",
                      }}
                    />
                  </div>
                  <div className="purchase-status">
                    <img
                      src={shopping_bag}
                      alt=""
                      className="shopping-bag-image"
                    />
                    {/* se compra efetuada \/ hide Animation */}
                    <DotsAnimation />
                  </div>
                </div>
                <div
                  className="form-input-content first-input-content"
                  id="card-input"
                >
                  <InputElement
                    type="text"
                    name="name"
                    placeholder="Titular do Cartão"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={cardDetails.name}
                  />
                  <InputElement
                    mask="9999 9999 9999 9999"
                    type="tel"
                    name="number"
                    placeholder="0000 0000 0000 0000"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={cardDetails.number}
                  />
                </div>
                <div className="form-input-content" id="card-input">
                  <InputElement
                    type="text"
                    name="expiry"
                    mask="99/99"
                    placeholder="MM/AA"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={cardDetails.expiry}
                  />
                  <input
                    type="tel"
                    name="cvc"
                    mask="999"
                    placeholder="CVC"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={cardDetails.cvc}
                    maxLength={3}
                  />
                  <InputElement
                    type="tel"
                    name="CPF"
                    mask="999.999.999-99"
                    placeholder="CPF DO TITULAR"
                    onChange={handleInputChange}
                    value={cardDetails.CPF}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="form-actions-content">
          <CartButton value="Voltar" onPress={() => handleBackButtonClick()} />
          {step !== 2 ? (
            <CartButton
              type={"button"}
              value={"Avançar"}
              onPress={() => handleAvancar()}
            />
          ) : (
            <input
              className="button_principal"
              id="form-action-btn"
              value={"Finalizar Compra"}
              style={{ backgroundColor: "var(--secondary-color)" }}
              type={"submit"}
            />
          )}
        </div>
      </form>
    </div>
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
  );
};

const CartButton = ({ onPress, value, type }) => {
  return (
    <button
      className="button_principal"
      id="form-action-btn"
      type={type ? type : "button"}
      onClick={onPress}
    >
      {value ? value : "botão"}
    </button>
  );
};

const DotsAnimation = () => {
  return (
    <div className="loading-spinner">
      <span className="dot">a</span>
      <span className="dot">a</span>
      <span className="dot">a</span>
    </div>
  );
};
