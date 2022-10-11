import React, { useEffect, useRef, useState } from 'react';
import { AUTH_FIRST, AUTH_SECOND, AUTH_THIRD } from '../../constants/auth';
import useDebounce from '../../hooks/useDebounce';
import Pagination from '../pagination/pagination';
import { CenterBox, Container } from '../style/RecycleStyle';
import { AntCircularProgress } from '../../recycleComponents/progress/AntCircularProgress';
import RepositoryListItem from '../../recycleComponents/list/RepositoryListItem';
import { errorHandler } from '../../utills/error';

/******************************************************************************************
 * Repository  페이지 컴포넌트
 *
 * @inputValue: 현재 검색어
 *****************************************************************************************/
const Repository = ({ inputValue }: string | any) => {
  const [res, setRes] = useState<[] | any>(null);
  const [apiData, setApiData] = useState<[] | any>([]);
  const [page, setPage] = useState<number>(1);
  const [searched, setSearched] = useState<string>('');
  const [isloading, setIsloading] = useState<boolean>(false);

  /**********************************************************************
   * 성능 개선을 위한 훅스
   *********************************************************************/
  const totalRef = useRef<object | number>(0);

  const debounceValue = useDebounce(inputValue);

  /**********************************************************************/

  const getRepositoryApi = async (
    auth: string,
    page: number,
    inputValue: string,
  ) => {
    //검색어가 바뀌었을떄
    if (!res?.items && inputValue !== searched) {
      setIsloading(true);
    }
    return await fetch(
      `https://api.github.com/search/repositories?per_page=${30}&page=${page}&q=${inputValue}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'token' + auth,
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //검색어가 바뀌지 않았을때
        if (res?.items && inputValue === searched) {
          setApiData([...apiData, ...data.items]);
        } else {
          totalRef.current = data.total_count;
          setRes(data);
          setApiData(data.items);
        }
        setSearched(inputValue);
        setIsloading(false);
      })
      .catch((err) => {
        errorHandler();
      });
  };

  /**********************************************************************
   * 검색어 변경시 로딩 스테이트 변경 훅스
   *********************************************************************/
  useEffect(() => {
    return () => {
      setIsloading(true);
    };
  }, [inputValue]);

  /**********************************************************************
   * 검색어 변경에 따른 Repository 데이터 호출 훅스
   *
   * @debounceValue : useDebounce 훅스를 사용하여 검색어 입력시 딜레이를주어  API 호출을 최소화함
   *********************************************************************/
  useEffect(() => {
    if (!debounceValue) return;

    getRepositoryApi(
      AUTH_FIRST + AUTH_SECOND + AUTH_THIRD,
      page,
      debounceValue,
    );
  }, [debounceValue]);

  return (
    <Container>
      {inputValue && isloading ? (
        <CenterBox>
          <AntCircularProgress />
        </CenterBox>
      ) : !res && !isloading ? (
        <CenterBox>{`Please enter a search term ... 😃`}</CenterBox>
      ) : (
        <>
          <h2>
            {' '}
            {`Searching "${searched}" Result :  ${res?.total_count} available repository`}
          </h2>
          <Pagination
            data={apiData}
            page={page}
            setPage={setPage}
            totalRef={totalRef.current}
            getApi={getRepositoryApi}
            inputValue={debounceValue}
            ListComponents={RepositoryListItem}
          />
        </>
      )}
    </Container>
  );
};

export default Repository;
