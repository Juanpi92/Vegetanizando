import Lottie from 'lottie-react'
import React from 'react'
import warning from './warning.json'
import '../animations.css';

export default function WarningAnimation() {
  return (
    <Lottie
            animationData={warning}
            style={{
                width: 150,
                height: 150
            }}
            loop={false}
            className='warning-animation'
        />
  )
}
