import React, { useState } from 'react';
import Pan from './Pan';
import Rotate from './Rotate';
import Swipe from './Swipe';
import Pinch from './Pinch';

import './App.css';

function App() {
  const [activeDemo, setActiveDemo] = useState('');

  const handleDemoToggle = event => {
    if (event.preventDefault) {
      setActiveDemo(event.target.getAttribute('href'));
    } else {
      if (activeDemo === event) {
        setActiveDemo('');
      } else {
        setActiveDemo(event);
      }
    }
  };

  return (
    <main className='app'>
      <section>
        <header className='header'>
          <h1>useGestures Examples</h1>
          <p>It is best to check this page on a mobile device</p>
          <nav>
            Check out some examples:
            <br />
            <a onClick={handleDemoToggle} href='#pan'>
              Pan
            </a>{' '}
            |{' '}
            <a onClick={handleDemoToggle} href='#rotate'>
              Rotation
            </a>{' '}
            |{' '}
            <a onClick={handleDemoToggle} href='#swipe'>
              Swipe
            </a>{' '}
            |{' '}
            <a onClick={handleDemoToggle} href='#pinch'>
              Pinch
            </a>
          </nav>
        </header>
        <Pan onToggle={handleDemoToggle} isActive={activeDemo === '#pan'} />
        <Rotate onToggle={handleDemoToggle} isActive={activeDemo === '#rotate'} />
        <Swipe onToggle={handleDemoToggle} isActive={activeDemo === '#swipe'} />
        <Pinch onToggle={handleDemoToggle} isActive={activeDemo === '#pinch'} />
      </section>
    </main>
  );
}

export default App;

/*
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const image = useRef(null);
  const div = useRef(null);

  useGestures(image, {
    onPanStart: event => console.log('image pan start handler', event),
    onPanMove: event => {
      // console.log('image pan move handler', event);
      setImageRotation(event.angleDeg);
    },
    onSwipeLeft: event => {
      console.log('image swipe left handler', event);
      event.target.style = 'transform: translateX(' + event.deltaX * 2 + 'px)';
    },
    onSwipeRight: event => {
      console.log('image swipe right handler', event);
      event.target.style = 'transform: translateX(' + event.deltaX * 2 + 'px)';
    },
    onSwipeUp: event => console.log('image swipe up handler', event),
    onSwipeDown: event => console.log('image swipe down handler', event),
    onPanEnd: event => console.log('image pan end handler', event),
    onSwipeLeftEnd: event => {
      console.log('image swipe left end handler', event);
      setTimeout(() => {
        event.target.style = 'transform: translateX(0)';
      }, 1000);
    },
    onSwipeRightEnd: event => {
      console.log('image swipe right end handler', event);
      setTimeout(() => {
        event.target.style = 'transform: translateX(0)';
      }, 1000);
    },
    onSwipeUpEnd: event => console.log('image swipe up end handler', event),
    onSwipeDownEnd: event => console.log('image swipe down end handler', event),
    onPinchStart: event => console.log('image pinch start handler', event),
    onPinchChanged: event => {
      console.log('image pinch handler', event);
      // event.target.style = 'transform: scale(' + event.scale + ')';
      setImageScale(event.scale);
      setImageRotation(event.angleDeg);
    },
    onPinchEnd: event => {
      console.log('image pinch end handler', event);
      setImageScale(1);
      setImageRotation(0);
    }
  });

  useGestures(div, {
    onSwipeLeft: event => console.log('div swipe left handler', event),
    onSwipeRight: event => console.log('div swipe right handler', event)
  });
*/
