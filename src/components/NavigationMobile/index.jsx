import React, { useState } from 'react'
import './styles.css'
import { InfoOutlined, LocalDiningOutlined, LocalMallOutlined, PersonOutlined, RoomServiceOutlined, SearchOutlined } from '@mui/icons-material'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NavigationMobile() {
  const [active, setActive] = useState('food');
  const state = useSelector((state) => state);
  const { cart } = state.shopping;

  return (
    <nav className='nav-container'>
      <ul className="nav-content">
        <NavLink
          to="/"
          className="nav-item"
          id='food'
          style={{ borderTop: active === 'food' && "2px solid #86be3f" }}
          onClick={() => setActive('food')}>
          <LocalDiningOutlined style={{ color: active === 'food' ? "#333" : "#7e7e7e" }} />
        </NavLink>
        <NavLink
          to={'/servicos'}
          className="nav-item"
          id='services'
          style={{ borderTop: active === 'services' && "2px solid #86be3f" }}
          onClick={() => setActive('services')}>
          <RoomServiceOutlined style={{ color: active === 'services' ? "#333" : "#7e7e7e" }} />
        </NavLink>
        <NavLink
          to={'/acerca'}
          className="nav-item"
          id='about'
          style={{ borderTop: active === 'about' && "2px solid #86be3f" }}
          onClick={() => setActive('about')}>
          <InfoOutlined style={{ color: active === 'about' ? "#333" : "#7e7e7e" }} />
        </NavLink>
        <NavLink
          to={'/cart'}
          className="nav-item nav-cart-item"
          id='shopping'
          style={{ borderTop: active === 'shopping' && "2px solid #86be3f" }}
          onClick={() => setActive('shopping')}>
          <LocalMallOutlined style={{ color: active === 'shopping' ? "#333" : "#7e7e7e" }} />
          {cart.length > 0 && <span className="cart-quantity-feedback">{cart.length}</span>}
        </NavLink>
      </ul>
    </nav>
  )
}
