import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay = 700) {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceVal;
}

export default useDebounce;
