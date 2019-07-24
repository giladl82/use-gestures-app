import React, { useRef, useState } from 'react';
import logo from './img1.png';
import useGestures from '../hooks/useGestures';

export default function Rotate({ onToggle, isActive }) {
  const [imageRotation, setImageRotation] = useState(0);
  const image = useRef(null);

  useGestures(image, {
    onPanMove: event => {
      setImageRotation(event.angleDeg);
    },
    onPanEnd: event => {
      setImageRotation(1);
    }
  });

  return (
    <section className='section'>
      <h2
        onClick={() => {
          onToggle('#rotate');
        }}
        className='title'
        id='rotate'
      >
        <span className='toggle-button'>{isActive ? '-' : '+'}</span>
        Rotate
      </h2>
      <div style={{ display: isActive ? 'block' : 'none' }}>
        <p className='description'>Rotate logo using your finger</p>
        <pre className='code'>
          {`
export default function Rotate() {
  const [imageRotation, setImageRotation] = useState(0);
  const image = useRef(null);

  useGestures(image, {
    onPanMove: event => {
      setImageRotation(event.angleDeg);
    },
    onPanEnd: event => {
      setImageRotation(1);
    }
  });

  return (
    <img
    ref={image}
    src={logo}
    alt='React Logo'
    className='logo'
    style={{ transform: 'rotate(' + imageRotation + 'deg)' }}
  />);
  }
`}
        </pre>
        <img
          ref={image}
          src={logo}
          alt='React Logo'
          className='logo'
          style={{ transform: `rotate(${imageRotation}deg)` }}
        />
      </div>
    </section>
  );
}
