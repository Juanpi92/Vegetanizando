import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './styles.css';

const IMAGE_BACKGROUND = '';

export default function Banner() {
  return (
    <section className='banner-container'>
      <LazyLoadImage src={IMAGE_BACKGROUND} alt='' className='banner-content-image' />
    </section>
  )
}
