import React from 'react'
import './styles.css'

export default function ServicoCard({ icon, title, description, onPress }) {
    return (
        <div onClick={onPress} className='servico-card-container'>
            <img src={icon} alt="servico-icon" className='servico-icon' />
            <h3 className="servico-card-title">{title}</h3>
            <span className="servico-card-description">{description}</span>
        </div>
    )
}
