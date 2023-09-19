import React, { useState } from "react";
import "./styles.css";
import { WhatsApp } from "@mui/icons-material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from 'framer-motion';

export default function CustomSection({ data }) {
  const [loaded, setLoaded] = useState(false);
  let { id, title, text, image } = data;

  return (
    <motion.section
      initial={{ translateX: 2000 }}
      animate={{ translateX: 0 }}
      exit={{ opacity: 0,  }}
      transition={{ type: "spring", duration: 2.5 }}
      className="custom-section-container" id={id}>
      <LazyLoadImage
        src={image}
        className={loaded ? 'custom-section-image' : 'custom-section-image skeleton'}
        alt={'custom section image'}
        onLoad={() => setLoaded(true)}
      />
      <div className="custom-section-content">
        <h2 className="content-title">{title}</h2>
        <p className="content-text">{text}</p>
        <button
          className="button_principal"
          id="content-contact"
          onClick={() => {
            let menssage = `Estou interessado em contratar o serviço de ${title}`;
            window.open(
              `https://wa.me/5521970657460?text=${encodeURIComponent(
                menssage
              )}`,
              "_blank"
            );
          }}
        >
          Entre em contato
          <WhatsApp />
        </button>
      </div>
    </motion.section>
  );
}
