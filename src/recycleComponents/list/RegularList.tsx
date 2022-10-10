import React from 'react';

interface ListProps {
  items?: any;
  resourceName?: string;
  component?: any;
}

// @ts-ignore
const RegularList = ({items,resourceName,component: Component}) => {
  return (
    <>
      {items?.map((item:any, i:any)=>(
        <Component key={i} {...{[resourceName]:item}}/>
      ))}
    </ >
  );
};

export default RegularList;