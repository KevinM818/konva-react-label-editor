import {useEffect, useRef} from 'react';

const useEvent = (eventName, handler, element = window) => {
  console.log('running');
  const savedHandler = useRef();
  useEffect(() => savedHandler.current = handler, [handler]);
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {return;}
    const eventListener = e => savedHandler.current(e);
    element.addEventListener(eventName, eventListener);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}

export default useEvent;