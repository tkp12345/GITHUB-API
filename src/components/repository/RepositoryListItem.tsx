import React, { useState } from 'react';
import styled from 'styled-components';
import { dateConvertor } from '../../utills/dataFilter';
import { Respo_widget, Respo_widget_contents, Respo_widget_title } from './Repository.styled';

const AntButton = styled.button`
	&:hover {
		background: 'red';
	}
	&:active {
		background: 'red';
	}
`

// <StarOutlineRoundedIcon />
const RepositoryListItem = ({item}:any) => {
  const [selected , setSelected ] = useState(0);
  const handleChange = (event:any, newValue:any) => {
    console.log('click-data:',item)
    // @ts-ignore
    const getItem = JSON.parse(localStorage.getItem('favorite'));
    console.log('getItem:',getItem)
    localStorage.setItem('favorite', JSON.stringify(getItem?new Set([...getItem,item]):[item]));

    setSelected(newValue);
  };
  const {id,name,html_url,description,updated_at,language,owner} = item;
  return (
    <Respo_widget>
      <Respo_widget_contents>
        <Respo_widget_title>
      <a href={html_url}>{`${owner?.login}/${name}`}</a>
        </Respo_widget_title>
             {description}
      <p>{`업데이트 : ${dateConvertor(updated_at)}`}</p>
      </Respo_widget_contents>
      <Respo_widget_contents>
        {/*// @ts-ignore*/}
        <AntButton onClick={handleChange}>
          Favorite
        </AntButton>
      </Respo_widget_contents>
    </Respo_widget>

  // <div className="widget">
  //   <div className="left">
  //     <span className="title">{data.title}</span>
  //     <span className="counter">
  //         {data.isMoney && "$"} {amount}
  //       </span>
  //     <span className="link">{data.link}</span>
  //   </div>
  //   <div className="right">
  //     <div className="percentage positive">
  //       <KeyboardArrowUpIcon />
  //       {diff} %
  //     </div>
  //     {data.icon}
  //   </div>
  // </div>

  );
};

export default RepositoryListItem;


