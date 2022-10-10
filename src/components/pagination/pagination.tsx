import React, {memo, useCallback, useEffect, useState} from 'react';
import './style.css'
import useDebounce from "../../hooks/useDebounce";
import {AUTH_FIRST, AUTH_SECOND, AUTH_THIRD} from "../../constants/auth";
import RepositoryListItem from '../repository/RepositoryListItem';
import RegularList from '../../../src/recycleComponents/list/RegularList';
import { Container, Ul_flex } from '../style/RecycleStyle';

const renderData = (data:any) =>{
  return(
    <RegularList
      items={data}
      resourceName="item"
      component={RepositoryListItem}
    />
  )
}

interface PaginationProps {
  data?: any;
  page?: any;
  setPage?: any;
  totalRef?:any;
  getApi?: any;
  inputValue?: any;
}

/******************************************************************************************
 * Pagination  재 사용 컴포넌트
 *
 *****************************************************************************************/
const Pagination = (props:PaginationProps) => {
  console.log('🔁Pagination')
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);
  const [pages,setPages]=useState([])

  const handleClick = (e:any)=>{
    setcurrentPage(Number(e.target.id));
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data?.slice(indexOfFistItem,indexOfLastItem);
  const renderPageNumbers = pages?.map(number=>{
    if(number < maxPageNumberLimit+1 && number > minPageNumberLimit-1) {
      return (
        // @ts-ignore
        <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null}>
          {number}
        </li>
      )
    }else{
      return null;
    }
  })

  const handleNextBtn=()=>{
    setcurrentPage(currentPage+1);

    if(currentPage+1>maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit);
    }

    /**********************************************************************
     * 페이지네이션시  다음 데이터를 미리 가져옵니다
     *
     * @getApi : 호출할 API 함수
     *********************************************************************/
    if (props.data && !props.data[(currentPage+3) * itemsPerPage]) {
        props?.getApi(AUTH_FIRST + AUTH_SECOND + AUTH_THIRD, props.page + 1, props.inputValue)
        props.setPage(props.page + 1)
    }
  }
  const handlePrevBtn=()=>{
    setcurrentPage(currentPage-1);
    if((currentPage-1) % pageNumberLimit == 0){
      setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit);
    }
  }

  /**********************************************************************
   * 검색한 total 에대한 상태를 렌더링 하기위한 훅스
   *
   * 동일한 검색어에대한 total 값은 변하지않습니다 따라서 상대변화에 따른 렌더링을 최소화
   * 하기위해 useRef 훅을 사용하여 total 값이 변할시에만 렌더링 하기위한 훅스입니다
   *********************************************************************/
  useEffect(()=>{
      if(props.totalRef.current) {
        const page = []
        for (let i = 1; i <= Math.ceil(props.totalRef.current / itemsPerPage); i++) {
          page.push(i)
        }
        // @ts-ignore
        setPages(page)
      }
  },[props.totalRef.current])

  return (
    <Container>
      {props.data && props.data[0] &&
      <div>
        {renderData(currentItems)}
        <Ul_flex className="pageNumbers">
          <li>
            <button
              disabled={currentPage == pages[0]}
              onClick={handlePrevBtn}>
              {`< Previous`}
            </button>
          </li>

          {renderPageNumbers}

          <li>
            <button
              disabled={currentPage == pages[pages.length - 1]}
              onClick={handleNextBtn}
            >
              {`Next >`}
            </button>
          </li>
        </Ul_flex>
      </div>
      }
    </Container>
  );
};

export default Pagination;