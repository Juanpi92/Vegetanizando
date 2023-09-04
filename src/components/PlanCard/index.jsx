import { CheckOutlined } from '@mui/icons-material'
import React from 'react'
import './styles.css'

export default function PlanCard({ src, title, includes }) {
    return (
        <div className='plan-card-container'>
            <img
                src={src}
                className="plan-card-overlay">
            </img>
            <div className="plan-card-info">
            <p className="plan-card-title">{title}</p>
                {
                    includes.map((item, key) => (
                        <div key={key} className="item-info-container">
                            <CheckOutlined className='card-info-check'/>
                            <p className="card-info-item">{item}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
