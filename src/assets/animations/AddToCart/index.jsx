import Lottie from 'lottie-react'
import React from 'react'
import AddToCart from './AddToCart.json'
import '../animations.css';

export default function AddToCartAnimation() {
    return (
        <Lottie
            animationData={AddToCart}
            style={{
                width: 150,
                height: 150
            }}
            loop={false}
            className='addtocart-animation'
        />
    )
}
