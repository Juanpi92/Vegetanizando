import React from 'react'
import './styles.css'

export default function MealCard({ image, description, name, size, price, onPress }) {

    return (
        <div className='meal-card-container' onClick={onPress}>
            <img className='meal-card-image' src={image} alt={description} />
            <div className="meal-card-info">
                <p className="meal-info-name">{name}</p>
                <p className="meal-info-size">{size}</p>
                <p className="meal-info-price">{price}</p>
            </div>
        </div>
    )
}
