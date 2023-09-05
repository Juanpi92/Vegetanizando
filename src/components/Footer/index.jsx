import React from "react";
import "./styles.css";
import { FacebookOutlined, Instagram, Twitter } from "@mui/icons-material";

function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: '#046a38' }}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h1 className='header-logo-title'>
              VEGETANIZAND
              <img src={'./imagenes/new-logo.png'} alt="Vegetanizando logo" className="app-logo" />
            </h1>
          </div>
          <div className="social-links">
            <p className="description">Siga-nos:</p>
            <div className="social-icons">
              <a href="https://www.facebook.com">
                <FacebookOutlined />
              </a>
              <a href="https://www.twitter.com">
                <Twitter />
              </a>
              <a href="https://www.instagram.com">
                <Instagram />
              </a>
            </div>
          </div>
          <div className="contact-links">
            <p className="description">Contato</p>
            <ul>
              <li><i className="fa-solid fa-house"></i> Coliseo 18. Maracanhã. Rio de Janeiro. RJ. CEP: 105682-21</li>
              <li><i className="fa-solid fa-phone"></i> +5521970657890</li>
              <li><i className="fa-solid fa-envelope"></i> vegetanizando@gmail.com</li>
            </ul>
          </div>
        </div>

      </div>
      <div className="footer-bar">
        <div className="container">
          <div className="copyright">
            Vegetanizando © 2023. All Rights Reserved.
          </div>
          <div className="developed-by">
            Desenvolvido por Label Soluções em TI
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;