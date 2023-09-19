import React from 'react'
import './styles.css'
import { motion } from 'framer-motion';

export default function ServicoCard({ icon, title, description, onPress, opacity }) {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "ease", duration: opacity }}
            onClick={onPress} className='servico-card-container'>
            <img src={icon} alt="servico-icon" className='servico-icon' />
            <h3 className="servico-card-title">{title}</h3>
            <span className="servico-card-description">{description}</span>
        </motion.div>
    )
}
