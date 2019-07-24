import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import useGestures from '../hooks/useGestures';

export default function Rotate({onToggle, isActive}) {
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const image = useRef(null);

  useGestures(image, {
    onPinchStart: event => {},
    onPinchChanged: event => {
      setImageScale(event.scale);
      setImageRotation(event.angleDeg);
    },
    onPinchEnd: event => {
      setImageScale(1);
      setImageRotation(0);
    }
  });

  return (
    <section className='section'>
      <h2
        onClick={() => {
          onToggle('#pinch');
        }}
        className='title'
        id="pinch"
      >
        <span className='toggle-button'>{isActive ? '-' : '+'}</span>
        Pinch
      </h2>
      <div style={{ display: isActive ? 'block' : 'none' }}>
        <p className='description'>Pinch the logo using two fingers to zoom it in / out</p>
        <pre className='code'>
          {`
export default function Rotate() {
  const [scale, setImageScale] = useState(1);
  const [rotation, setImageRotation] = useState(0);
  const image = useRef(null);

  useGestures(image, {
    onPinchStart: event => {},
    onPinchChanged: event => {
      setImageScale(event.scale);
      setImageRotation(event.angleDeg);
    },
    onPinchEnd: event => {
      setImageScale(1);
      setImageRotation(0);
    }
  });

  return (
    <img
    ref={image}
    src={logo}
    alt='React Logo'
    className='logo'
    style={{ 
      transform: 'rotate(' + rotation + 'deg) scale(' + scale + ')' 
    }}
  />
  );
}
`}
        </pre>
        <img
          ref={image}
          src={logo}
          alt='React Logo'
          className='logo'
          style={{ transform: `rotate(${imageRotation}deg) scale(${imageScale})` }}
        />
      </div>
    </section>
  );
}
