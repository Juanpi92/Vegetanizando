import React from 'react'
import '../MealCard/styles.css'
import './styles.css'

export default function SkeletonCard({ variant }) {
    return (
        <>
            {
                variant === 'plan' ?
                    <div className='plan-card-container'>
                        <span
                            className="plan-card-overlay skeleton">
                        </span>
                        <div className="plan-card-info">
                            <p className="plan-card-title skeleton">titulo</p>
                            <div className="item-info-container skeleton">
                                <p className="card-info-item">item</p>
                            </div>
                            <div className="item-info-container skeleton">
                                <p className="card-info-item">item</p>
                            </div>
                            <div className="item-info-container skeleton">
                                <p className="card-info-item">item</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='meal-card-container'>
                        <span className='meal-card-image skeleton'/>
                        <div className="meal-card-info">
                            <p className="meal-info-name skeleton">NOME DA COMIDA</p>
                            <p className="meal-info-size skeleton">PORÇÃO</p>
                            <p className="meal-info-price skeleton">R$ PREÇO</p>
                        </div>
                        <button
                            className="button_principal skeleton"
                        >
                            Adicionar
                        </button>
                    </div>
            }
        </>

    )
}
