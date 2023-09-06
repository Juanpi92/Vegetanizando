import React, { useContext } from 'react'
import './styles.css'
import { AppContext } from '../../contexts/AppContext'

export default function PurchaseModal({ children, onBack }) {
  const { showModal, setShowModal } = useContext(AppContext);

  return (
    <>
      {
        showModal &&
        <article className='purchase-modal-container'>
          <div
            className="purchase-modal-overlay"
            onClick={() => setShowModal(!showModal)}
          ></div>
          <div className="purchase-modal-content">
            {children}
          </div>
        </article>
      }
    </>
  )
}
