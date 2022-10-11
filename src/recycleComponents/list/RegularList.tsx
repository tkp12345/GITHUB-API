import React, { SetStateAction } from 'react';

interface ListProps {
  items?: any;
  setItems?: SetStateAction<any>;
  resourceName?: string;
  type?: string;
  component?: any;
}

/******************************************************************************************
 * 리스트 렌더링을 위한 재사용 컴포넌트
 *
 * @items : 리스트 데이터 (배열객체)
 * @setItems : 리스트 데이터 변경 함수
 * @resourceName : item 에대한 파라미터 명
 * @component : 리스트 조회 하기위한 하기위한 컴포넌트
 * @type: 사용컴포넌트에 따른 type
 *****************************************************************************************/
const RegularList = ({
  items,
  setItems,
  resourceName,
  component: Component,
  type,
}: ListProps) => {
  return (
    <>
      {items?.map((item: any, i: any) => (
        <Component
          key={i}
          type={type}
          setItems={setItems}
          // @ts-ignore
          {...{ [resourceName]: item }}
        />
      ))}
    </>
  );
};

export default RegularList;
