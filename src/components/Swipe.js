import React, { useRef, useState } from 'react';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';
import img4 from './img4.png';
import useGestures from 'use-gestures';

export default function Swipe({ onToggle, isActive }) {
  const [imageIndex, setImageIndex] = useState(0);
  const gallery = useRef(null);

  useGestures(gallery, {
    onSwipeLeft: event => {
      console.log('swipe left');
      if (imageIndex > -3) {
        setImageIndex(imageIndex - 1);
      }
    },
    onSwipeRight: event => {
      console.log('swipe right');
      if (imageIndex < 3) {
        setImageIndex(imageIndex + 1);
      }
    }
  });

  return (
    <section className='section'>
      <h2
        onClick={() => {
          onToggle('#swipe');
        }}
        className='title'
        id='swipe'
      >
        <span className='toggle-button'>{isActive ? '-' : '+'}</span>
        Swipe
      </h2>
      <div style={{ display: isActive ? 'block' : 'none' }}>
        <p className='description'>Swipe left / right using your finger to switch between images</p>
        <pre className='code'>{`
export default function Swipe() {
  const [imageIndex, setImageIndex] = useState(0);
  const gallery = useRef(null);

  useGestures(gallery, {
    onSwipeLeft: event => {
      if (imageIndex > -3) {
        setImageIndex(imageIndex - 1);
      }
    },
    onSwipeRight: event => {
      if (imageIndex < 3) {
        setImageIndex(imageIndex + 1);
      }
    }
  });

  return (
    <div className='gallery'>
    <div
      ref={gallery}
      className='gallery__images'
      style={{
        transform: 'translate(' + 128 * imageIndex + 'px)'
      }}
    >
      <img src={img1} alt='img' />
      <img src={img2} alt='img' />
      <img src={img3} alt='img' />
      <img src={img4} alt='img' />
    </div>
  </div>
  );
}
`}</pre>
        <div className='gallery'>
          <div
            ref={gallery}
            className='gallery__images'
            style={{
              transform: 'translate(' + 128 * imageIndex + 'px)'
            }}
          >
            <img src={img1} alt='img' />
            <img src={img2} alt='img' />
            <img src={img3} alt='img' />
            <img src={img4} alt='img' />
          </div>
        </div>
        {(imageIndex === 3 || imageIndex === -3) && <button onClick={() => setImageIndex(0)}>reset</button>}
      </div>
    </section>
  );
}
