import React, { useState } from 'react'
import './styles.css'
import { ShoppingCartOutlined } from '@mui/icons-material'
import { addToCart, calculateTotalCart } from '../../reducer/shoopingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

export default function MealCard({ data }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  const { onRequestShowAlert } = useContext(AppContext);
  let { id, url, name, portion, price } = data;

  const handleAddToCart = (id) => {
    let action = dispatch(addToCart(id)).payload
    let checkCart = cart.find((item) => item.id === action)
    let produto = name;

    if(checkCart){
      onRequestShowAlert({ variant: 'warning', message: 'Você já adicionou este produto a sua sacola!'})
      return
    }else {
      dispatch(addToCart(id));
      dispatch(calculateTotalCart());
      onRequestShowAlert({ variant: 'add-cart', message: `${produto} foi adicionado a sua sacola!`})
    }
  }

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
        onClick={() => handleAddToCart(id)}
      >
        Adicionar
        <ShoppingCartOutlined />
      </button>
    </div>
  )
}
