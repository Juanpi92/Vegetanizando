import React, { useState } from 'react'
import './styles.css'
import { ShoppingCartOutlined } from '@mui/icons-material'
import { addToCart, calculateTotalCart } from '../../reducer/shoopingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function MealCard({ data }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  let { id, url, name, portion, price } = data;

  return (
    <div className='meal-card-container'>
      <LazyLoadImage
        className={loaded ? 'meal-card-image' : 'meal-card-image skeleton'}
        src={url}
        alt={name}
        onLoad={() => setLoaded(true)}
      />
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
