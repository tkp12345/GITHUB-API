import React, { useCallback, useState } from 'react';
import { cutStr, dateConvertor } from '../../utills/dataFilter';
import {
  Respo_widget,
  Respo_widget_contents,
  Respo_widget_title,
} from '../../components/repository/Repository.styled';
import _LocalStorage from '../../utills/LocalStorage';
import { FAVORITE_TYPE, REPOSITORY_TYPE } from '../../utills/type';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { AntButton } from '../../components/style/Button/Button';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

/******************************************************************************************
 * Repository 데이터 리스트 컴포넌트
 *
 * @type : 사용컴포넌트에 따른 type
 * @item : 리스트 데이터
 * @setItems : 리스트 데이터 변경 함수
 *****************************************************************************************/
const RepositoryListItem = ({ type, setItems, item }: any) => {
  const [selected, setSelected] = useState(0);
  const { name, html_url, description, updated_at, owner } = item;

  const handleAddFavorite = useCallback(() => {
    if (_LocalStorage.getFavorite().length > 3) {
      alert('4개이상 등록이 불가능 합니다.');
      return;
    }
    _LocalStorage.addFavorite(item);
  }, [_LocalStorage.getFavorite()]);

  const handleDelete = useCallback(() => {
    setItems(
      _LocalStorage.getFavorite().filter((fav: any) => fav.id !== item.id),
    );
    _LocalStorage.removeFavorite(item.id);
  }, [item.id]);

  return (
    <Respo_widget>
      <Respo_widget_contents>
        <Respo_widget_title>
          <a
            href={html_url}
            target="_blank"
            style={{ color: 'rgb(160, 160, 160)' }}
          >
            <BookOutlinedIcon />
            {`${owner?.login}/${name}`}
          </a>
        </Respo_widget_title>
        {cutStr(description, 100)}
        <p>{`업데이트 : ${dateConvertor(updated_at)}`}</p>
      </Respo_widget_contents>
      <Respo_widget_contents>
        {type === REPOSITORY_TYPE && (
          <AntButton onClick={() => handleAddFavorite()}>
            <StarRoundedIcon />
          </AntButton>
        )}
        {type === FAVORITE_TYPE && (
          <AntButton onClick={() => handleDelete()}>
            <DeleteRoundedIcon />
          </AntButton>
        )}
      </Respo_widget_contents>
    </Respo_widget>
  );
};

export default RepositoryListItem;
