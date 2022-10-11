import React, { useEffect, useState } from 'react';
import RegularList from '../../../recycleComponents/list/RegularList';
import { FAVORITE_TYPE } from '../../../utills/type';
import RepositoryListItem from '../../../recycleComponents/list/RepositoryListItem';
import _LocalStorage from '../../../utills/LocalStorage';

const FavoriteTab = () => {
  const MAX = 4;
  const [favoriteData, setFavoriteData] = useState<[]>(
    _LocalStorage.getFavorite(),
  );

  useEffect(() => {
    setFavoriteData(_LocalStorage.getFavorite());
  }, []);

  return (
    <>
      <h2>
        {`Total Favorites ( ${_LocalStorage.getFavorite().length} / ${MAX})`}
      </h2>
      <RegularList
        type={FAVORITE_TYPE}
        items={favoriteData}
        setItems={setFavoriteData}
        resourceName="item"
        component={RepositoryListItem}
      />
    </>
  );
};

export default FavoriteTab;
