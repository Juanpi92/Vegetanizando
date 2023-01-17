import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="">
        <div className="contenedor ultima">
          <div className="siguenos">
            <p className="descripcion">Siguenos:</p>
            <div className="social">
              <a className="button_footer" href="#!">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a className="button_footer" href="#!">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="button_footer" href="#!">
                <i className="fab fa-google"></i>
              </a>
              <a className="button_footer" href="#!">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="button_footer" href="#!">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="contacto">
            <p className="descripcion">Contacto</p>
            <div>
              <i className="fa-solid fa-house"></i> Coliseo 18. Maracanhã. Rio
              de Janeiro. RJ. CEP: 105682-21
            </div>
            <div>
              <i className="fa-solid fa-phone"></i> +5521970657890
            </div>
            <div>
              <i className="fa-solid fa-envelope"></i> vegetanizando@gmail.com
            </div>
          </div>
        </div>
        <div className="ultima2">© 2023 Copyright: FrontEnders</div>
      </footer>
    </>
  );
};

export default Footer;
