import { CheckOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import './styles.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function PlanCard({ src, title, includes }) {
  const [loaded, setLoaded] = useState(false);

  return (
        <div className='plan-card-container'>
            <LazyLoadImage
                className={loaded ? 'plan-card-overlay' : 'plan-card-overlay skeleton'}
                src={src}
                alt={'plan card image'}
                onLoad={() => setLoaded(true)}
            />
            <div className="plan-card-info">
                <p className="plan-card-title">{title}</p>
                {
                    includes.map((item, key) => (
                        <div key={key} className="item-info-container">
                            <CheckOutlined className='card-info-check' />
                            <p className="card-info-item">{item}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
