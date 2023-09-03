import React from 'react'
import vegan_logo from '../../../public/imagenes/logo.png'
import './styles.css'

export default function Header() {
  return (
    <header className='header-container'>
      <img src={vegan_logo} alt="Vegetanizando logo" className="app-logo" />
    </header>
  )
}
