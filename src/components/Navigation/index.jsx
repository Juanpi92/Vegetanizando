import React, { useState } from 'react'
import './styles.css'
import { LocalDiningOutlined, LocalMallOutlined, PersonOutlined, SearchOutlined } from '@mui/icons-material'

export default function Navigation() {
  const [active, setActive] = useState('food');

  return (
    <nav className='nav-container'>
      <ul className="nav-content">
        <li
          className="nav-item"
          id='food'
          style={{ borderTop: active === 'food' && "2px solid #86be3f" }}
          onClick={() => setActive('food')}>
          <LocalDiningOutlined style={{ color: active === 'food' ? "#333" : "#7e7e7e" }} />
        </li>
        <li
          className="nav-item"
          id='search'
          style={{ borderTop: active === 'search' && "2px solid #86be3f" }}
          onClick={() => setActive('search')}>
          <SearchOutlined style={{ color: active === 'search' ? "#333" : "#7e7e7e" }} />
        </li>
        <li
          className="nav-item"
          id='shopping'
          style={{ borderTop: active === 'shopping' && "2px solid #86be3f" }}
          onClick={() => setActive('shopping')}>
          <LocalMallOutlined style={{ color: active === 'shopping' ? "#333" : "#7e7e7e" }} />
        </li>
        <li
          className="nav-item"
          id='user'
          style={{ borderTop: active === 'user' && "2px solid #86be3f" }}
          onClick={() => setActive('user')}>
          <PersonOutlined style={{ color: active === 'user' ? "#333" : "#7e7e7e" }} />
        </li>
      </ul>
    </nav>
  )
}
