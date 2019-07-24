import React, { useRef, useState } from 'react';
import logo from './img2.png';
import useGestures from '../hooks/useGestures';

export default function Pan({ onToggle, isActive }) {
  const [log, setLog] = useState('Pan log:');
  const image = useRef(null);

  useGestures(image, {
    onPanStart: event => {
      setLog(JSON.stringify(event));
    },
    onPanMove: event => {
      setLog(`${log} ${JSON.stringify(event)}`);
    },
    onPanEnd: event => {
      setLog(`${log} ${JSON.stringify(event)} *********** DONE ***** `);
    }
  });

  return (
    <section className='section'>
      <h2
        onClick={() => {
          onToggle('#pan');
        }}
        className='title'
        id='pan'
      >
        <span className='toggle-button'>{isActive ? '-' : '+'}</span>
        Pan (Pan)
      </h2>
      <div style={{ display: isActive ? 'block' : 'none' }}>
        <p className='description'>Pan (move) over the logo with your finger</p>
        <pre className='code'>
          {`
export default function Pan() {
  const [log, setLog] = useState('');
  const image = useRef(null);

  useGestures(image, {
    onPanStart: event => {
      setLog(JSON.stringify(event));
    },
    onPanMove: event => {
      setLog(log + ' ' + JSON.stringify(event));
    },
    onPanEnd: event => {
      setLog(log + ' ' + JSON.stringify(event) + ' *********** DONE ***** ');
    }
  });

  return (
    <img
    ref={image}
    src={logo}
    alt='React Logo'
    className='logo'         
  />
  <div className='log'>{log}</div>);
  }
`}
        </pre>
        <img ref={image} src={logo} alt='React Logo' className='logo' />
        <div className='log'>{log}</div>
      </div>
    </section>
  );
}
