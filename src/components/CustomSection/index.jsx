import React from 'react'
import './styles.css'
import { WhatsApp } from '@mui/icons-material';

export default function CustomSection({ data }) {
    let { id, title, text, image } = data;

    return (
        <section className='custom-section-container' id={id}>
            <img src={image} alt="" className="custom-section-image" />
            <div className="custom-section-content">
                <h2 className="content-title">{title}</h2>
                <p className="content-text">{text}</p>
                <button className="button_principal" id='content-contact'>
                    Entre em contato
                    <WhatsApp />
                </button>
            </div>
        </section>
    )
}
