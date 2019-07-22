import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

class Pointer {
  constructor(touches) {
    this.x = touches.clientX;
    this.y = touches.clientY;
  }
}

/**
 * 
 * @param {Object} ref React ref object
 * @param {{   
    onPanStart: function,
    onPanMove: function,
    onSwipeLeft: function,
    onSwipeRight: function,
    onSwipeUp: function,
    onSwipeDown: function,
    onPanEnd: function,
    onSwipeLeftEnd:function,
    onSwipeRightEnd: function,
    onSwipeUpEnd: function,
    onSwipeDownEnd: function,
    onPinchStart: function,
    onPinchChanged:function,
    onPinchEnd: function,
    }} handlers 
 * @param {{
    minDelta: number
  }} options 
 */
function useGestures(
  ref,
  handlers,
  options = {
    minDelta: 30
  }
) {
  const [touches, setTouches] = useState(null);
  const [gesture, setGesture] = useState('');

  useEffect(() => {
    const element = ref.current;

    const getCurrentTouches = (target, touches, prevTouch) => {
      if (touches.length === 2) {
        const pointer1 = new Pointer(touches[0]);
        const pointer2 = new Pointer(touches[1]);

        const distance = getDistance(pointer1, pointer2);

        return {
          target,
          pointers: [pointer1, pointer2],
          delta: prevTouch ? distance - prevTouch.distance : 0,
          scale: prevTouch ? distance / options.minDelta : 1,
          distance,
          angleDeg: getAngleDeg(pointer1, pointer2)
        };
      } else {
        const pointer = new Pointer(touches[0]);

        return {
          target,
          ...pointer,
          deltaX: prevTouch ? pointer.x - prevTouch.x : 0,
          deltaY: prevTouch ? pointer.y - prevTouch.y : 0,
          distance: prevTouch ? getDistance(pointer, prevTouch) : 0,
          angleDeg: prevTouch ? getAngleDeg(pointer, prevTouch) : 0
        };
      }
    };

    /**
     *
     * @param {{x: number, y: number}} p1
     * @param {{x: number, y: number}} p2
     */
    const getDistance = (p1, p2) => {
      const powX = Math.pow(p1.x - p2.x, 2);
      const powY = Math.pow(p1.y - p2.y, 2);

      return Math.sqrt(powX + powY);
    };

    /**
     *
     * @param {{x: number, y: number}} p1
     * @param {{x: number, y: number}} p2
     */
    const getAngleDeg = (p1, p2) => {
      return (Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180) / Math.PI;
    };

    const callHandler = (eventName, event) => {
      if (eventName && handlers[eventName] && typeof handlers[eventName] === 'function') {
        handlers[eventName](event);
      }
    };

    const handleTouchStart = event => {
      const currentTouches = getCurrentTouches(event.target, event.touches, null);
      setTouches(currentTouches);

      if (event.touches.length === 2) {
        callHandler('onPinchStart', currentTouches);
      } else {
        callHandler('onPanStart', currentTouches);
      }
    };

    const handleTouchMove = event => {
      const currentTouches = getCurrentTouches(event.target, event.touches, touches);
      setTouches(currentTouches);

      if (event.touches.length === 2) {
        callHandler('onPinchChanged', currentTouches);
      } else {
        callHandler('onPanMove', currentTouches);

        let eventName, theGesture;

        if (Math.abs(currentTouches.deltaX) >= options.minDelta && Math.abs(currentTouches.deltaY) < options.minDelta) {
          if (currentTouches.deltaX < 0) {
            eventName = 'onSwipeLeft';
            theGesture = 'swipeLeft';
          } else {
            eventName = 'onSwipeRight';
            theGesture = 'swipeRight';
          }
        } else if (
          Math.abs(currentTouches.deltaX) < options.minDelta &&
          Math.abs(currentTouches.deltaY) >= options.minDelta
        ) {
          if (currentTouches.deltaY < 0) {
            eventName = 'onSwipeUp';
            theGesture = 'swipeUp';
          } else {
            eventName = 'onSwipeDown';
            theGesture = 'swipeDown';
          }
        } else {
          theGesture = '';
        }

        callHandler(eventName, touches);
        setGesture(theGesture);
      }
    };

    const handleTouchEnd = event => {
      const currentTouches = getCurrentTouches(event.target, event.changedTouches, null);
      if (touches && touches.pointers) {
        if (touches.pointers.length === 2) {
          callHandler('onPinchEnd', currentTouches);
        } else {
          callHandler('onPanEnd', currentTouches);
        }
      }

      if (gesture) {
        callHandler(`on${gesture.charAt(0).toUpperCase() + gesture.slice(1)}End`, currentTouches);
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  });
}

function App() {
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
    onSwipeLeft:  event => {
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
      console.log('image swipe left end handler', event)
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

  return (
    <div className='App'>
      <img
        ref={image}
        src={logo}
        alt='logo'
        style={{ width: 360, transform: `scale(${imageScale}) rotate(${imageRotation}deg)` }}
      />
      <div ref={div} style={{ width: 360, height: 160, backgroundColor: 'blue', margin: '10px auto' }} />
    </div>
  );
}

export default App;
