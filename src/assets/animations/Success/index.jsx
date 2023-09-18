import Lottie from 'lottie-react'
import React from 'react'
import success from './success.json'
import '../animations.css';

export default function SuccessAnimation() {
    return (
        <Lottie
            animationData={success}
            style={{
                width: 150,
                height: 150
            }}
            loop={false}
            className='success-animation'
        />
    )
}
