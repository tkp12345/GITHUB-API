import {useEffect, useState} from "react";

function useDebounce(value:any , delay = 600){
  const [devounceVal, setDebounceVal] = useState(value);

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebounceVal(value);
    },delay);
    return ()=>{
      clearTimeout(handler);
    };
  },[value,delay]);

  return devounceVal;
}

export default useDebounce;