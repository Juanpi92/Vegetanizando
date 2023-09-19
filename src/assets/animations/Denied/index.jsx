import Lottie from 'lottie-react'
import React from 'react'
import denied from './denied.json'
import '../animations.css';

export default function DeniedAnimation() {
  return (
    <Lottie
            animationData={denied}
            style={{
                width: 150,
                height: 150
            }}
            loop={false}
            className='denied-animation'
        />
  )
}
