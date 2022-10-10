import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, CircularProgress, Divider, LinearProgress, Stack } from '@mui/material';
import { AUTH_FIRST, AUTH_SECOND, AUTH_THIRD } from '../../constants/auth';
import useDebounce from '../../hooks/useDebounce';
import Pagination from '../pagination/pagination';
import usePrevState from '../../hooks/usePrevState';
import { FacebookCircularProgress } from '../../recycleComponents/progress/FacebookCircularProgress';
import { Container } from '../style/RecycleStyle';

/******************************************************************************************
 * Repository  페이지 컴포넌트
 *
 * @inputValue: 현재 검색어
 *****************************************************************************************/
const Repository = ({inputValue}:string|any) => {
  console.log('🔁Repository')
  const [res,setRes] = useState<[]|null>(null)
  const [apiData,setApiData] = useState<[]>([])
  const [page,setPage]=useState<number>(1)
  const [searched,setSearched]=useState<string>('')
  const [isloading,setIsloading]=useState<boolean>(false)

  /**********************************************************************
   * 성능 개선을 위한 훅스
   *********************************************************************/
   const totalRef = useRef<object|number>(0);

  const debounceValue = useDebounce(inputValue);

  /**********************************************************************/

  const getRepository =  (async (auth:any,page:any,inputValue:any)=>{
    //검색어가 바뀌었을떄
    // @ts-ignore
    if(!res?.items && inputValue!==searched) {
      setIsloading(true)
    }
    return await fetch(
      `https://api.github.com/search/repositories?per_page=${30}&page=${page}&q=${inputValue}`,{
        method:'GET',
        headers:{
          Authorization:'token'+auth
        }
      }
    )
      .then(response => {
        return response.json();
      }).then(data => {
        //검색어가 바뀌지 않았을때
        // @ts-ignore
        if(res?.items && inputValue===searched){
          // @ts-ignore
          setApiData(([...apiData,...data.items]))
        }else{
          totalRef.current=data.total_count
          setRes(data)
          setApiData(data.items)
        }
        setSearched(inputValue)
        setIsloading(false)

      })
      .catch(((err)=>console.error(err)));
  });

  /**********************************************************************
   * 검색어 변경시 로딩 스테이트 변경 훅스
   *********************************************************************/
  useEffect(()=>{
    return ()=> {
      setIsloading(true)
    }
  },[inputValue])

  /**********************************************************************
   * 검색어 변경에 따른 Repository 데이터 호출 훅스
   *
   * @debounceValue : useDebounce 훅스를 사용하여 검색어 입력시 딜레이를주어  API 호출을 최소화함
   *********************************************************************/
  useEffect(() => {
    if(!debounceValue){
      return;
    }
    getRepository(AUTH_FIRST + AUTH_SECOND + AUTH_THIRD,page,debounceValue)
  },[debounceValue]);

  // @ts-ignore
  return (
    <Container>
        {isloading?
          <>
            <FacebookCircularProgress/>
          </>
        :!res && !isloading?
            <>
              {`검색어를 입력해주세요`}
            </>
            :
            <>
            {/*@ts-ignore*/}
            <h2> {`Searching "${searched}" Result :  ${res.total_count} available repository`}</h2>
              {/*// @ts-ignore*/}
              <Pagination data={apiData} page={page} setPage={setPage} totalRef={totalRef}  getApi={getSearch} inputValue={debounceValue}/>
              </>
        }
    </Container>
  );
};

export default Repository;