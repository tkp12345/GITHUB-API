/**********************************************************************
 * LocalStorage 데이터 조회 및 변경 함수
 *
 *********************************************************************/
const LocalStorage = () => {
  const storeUserData = (favoriteData: any) => {
    localStorage.setItem('FAVORITE_REPO', JSON.stringify(favoriteData));
  };

  const getFavorite = () => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('FAVORITE_REPO'));
  };

  const removeFavorite = (id: string) => {
    const newUserData = getFavorite().filter((fav: any) => fav.id !== id);
    storeUserData(newUserData);
  };

  const addFavorite = (favoriteData: any) => {
    const isAdded = getFavorite()?getFavorite().find(
      (LocalFavorite: any) => LocalFavorite.id === favoriteData.id,
    ):false;
    //로컬스토리지 선택 요소 포함여부확인
    if (getFavorite() && isAdded) {
      removeFavorite(favoriteData.id);
      return;
    }
    const newUserData = getFavorite()
      ? [...getFavorite(), favoriteData]
      : [favoriteData];
    storeUserData(newUserData);
  };

  return {
    removeFavorite,
    addFavorite,
    getFavorite,
  };
};

const _LocalStorage = LocalStorage();

export default _LocalStorage;
