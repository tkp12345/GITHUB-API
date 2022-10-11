import React, { useCallback, useEffect, useRef, useState } from 'react';
import IssueListItem from '../../../recycleComponents/list/IssueListItem';
import Pagination from '../../pagination/pagination';
import { AUTH_FIRST, AUTH_SECOND, AUTH_THIRD } from '../../../constants/auth';
import _LocalStorage from '../../../utills/LocalStorage';
import { errorHandler } from '../../../utills/error';
import { CenterBox } from '../../style/RecycleStyle';
import { AntCircularProgress } from '../../../recycleComponents/progress/AntCircularProgress';
import { usePrevState } from '../../../hooks/usePrevState';

const IssueTab = () => {
  const [favoriteData, setFavoriteData] = useState<any>(
    _LocalStorage.getFavorite()?_LocalStorage.getFavorite():[],
  );
  const [isloading, setIsloading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [issueData, setIssueData] = useState<any>([]);

  /**********************************************************************
   * Issue 데이터 호출 API 함수
   *********************************************************************/
  const getIssueApi = async (auth: any, page: any, owner: any, repo: any) => {
    return await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?per_page=${100}&page=${page}`,
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
        return data;
      })
      .catch((err) => {
        errorHandler();
      });
  };
  /**********************************************************************
   * Repostory 에따른 Issue 조회 API 요청을 병렬로 하기위한 함수
   *********************************************************************/
  const callGetIssue = useCallback((page: number) => {
    setIsloading(true);
    let tempIssueData: any = [];
    Promise.all(
      favoriteData.map(async (favorite: any) => {
        const res = await getIssueApi(
          AUTH_FIRST + AUTH_SECOND + AUTH_THIRD,
          page,
          favorite?.owner.login,
          favorite?.name,
        );
        const updateRes = res.map((issue: any) => ({
          ...issue,
          _repositoryUrl: favorite.html_url,
          _repositoryOwner: favorite.owner.login,
          _repositoryName: favorite.name,
        }));
        if (updateRes[0]) {
          tempIssueData = [...issueData, ...updateRes];
          setIssueData(tempIssueData);
        }
        setIsloading(false);
      }),
    );
  }, []);
  useEffect(() => {
    if (!favoriteData[0]) return;
    callGetIssue(page);
  }, []);

  return (
    <>
      {isloading ? (
        <AntCircularProgress />
      ) : (
        <Pagination
          data={issueData}
          page={page}
          setPage={setPage}
          totalRef={issueData.length}
          getApi={() => callGetIssue}
          ListComponents={IssueListItem}
        />
      )}
    </>
  );
};

export default IssueTab;
