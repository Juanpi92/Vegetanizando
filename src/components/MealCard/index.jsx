import React from 'react'
import './styles.css'
import { ShoppingCartOutlined } from '@mui/icons-material'
import { addToCart, calculateTotalCart } from '../../reducer/shoopingReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function MealCard({ data }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { cart } = state.shopping;
    let { id, url, name, portion, price } = data;

    return (
        <div className='meal-card-container'>
            <img className='meal-card-image' src={url} alt={name} />
            <div className="meal-card-info">
                <p className="meal-info-name">{name}</p>
                <p className="meal-info-size">{portion}</p>
                <p className="meal-info-price">R$ {price.toFixed(2)}</p>
            </div>
            <button
              className="button_principal"
              onClick={() => {
                dispatch(addToCart(id));
                dispatch(calculateTotalCart());
              }}
            >
                Adicionar 
              <ShoppingCartOutlined />
            </button>
        </div>
    )
}
