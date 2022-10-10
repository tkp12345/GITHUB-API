import { useEffect,useRef } from 'react';

function usePrevState(state:any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}

export default usePrevState;
