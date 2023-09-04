import React from 'react'
import './styles.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { LocalMallOutlined } from '@mui/icons-material';

export default function Header() {
  const state = useSelector((state) => state);
  const { cart } = state.shopping;

  return (
    <>
      <header className='header-container'>
        <img src={'./imagenes/logo.png'} alt="Vegetanizando logo" className="app-logo" />
      </header>
      <header className='header-container-desktop'>
        <img src={'./imagenes/logo.png'} alt="Vegetanizando logo" className="app-logo" />
        <nav className="nav-desktop-container">
          <ul className='nav-desktop-content'>
            <li>
              <NavLink to="/" activeclassname="active" className='nav-desktop-item'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/acerca" activeclassname="active" className='nav-desktop-item'>
                Acerca
              </NavLink>
            </li>
            <li>
              <NavLink to="/servicos" activeclassname="active" className='nav-desktop-item'>
                Serviços
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" activeclassname="active" className='nav-desktop-item shopping-icon-container'>
                <LocalMallOutlined className='shopping-icon' />
                {cart.length > 0 && <span className="cart-quantity-feedback">{cart.length}</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header >
    </>

  )
}
