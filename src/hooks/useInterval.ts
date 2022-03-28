import { useEffect, useRef } from 'react';

/**
 * `useInterval` sets up an interval and clears it after unmounting.
 * It’s a combo of setInterval and clearInterval tied to the component lifecycle.
 * 
 * @link https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param callback 
 * @param delay 
 */
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
