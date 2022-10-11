import React, { useState } from 'react';
import { cutStr, dateConvertor } from '../../utills/dataFilter';
import {
  Respo_widget,
  Respo_widget_contents,
  Respo_widget_title,
} from '../../components/repository/Repository.styled';
import { RowDiv } from '../../components/style/RecycleStyle';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

/******************************************************************************************
 * Issue 데이터 리스트 컴포넌트
 *
 * @item : 리스트 데이터
 *****************************************************************************************/
const IssueListItem = ({ item }: any) => {
  const [selected, setSelected] = useState(0);
  const {
    _repositoryName,
    _repositoryOwner,
    title,
    number,
    user,
    created_at,
    comments,
    html_url,
  } = item;

  return (
    <Respo_widget>
      <Respo_widget_contents>
        <Respo_widget_title>
          <a
            href={html_url.split('/', html_url.split('/').length - 1).join('/')}
            target="_blank"
            style={{ color: 'rgb(160, 160, 160)' }}
          >
            <BookOutlinedIcon />
            {`${_repositoryOwner}/${_repositoryName} #${number}`}
          </a>
        </Respo_widget_title>
        <a href={html_url} target="_blank">{`${cutStr(title, 100)}`}</a>
        <RowDiv>
          <h4>{`👤"${user?.login}" `}</h4>
          {`  opened ${dateConvertor(created_at)}`}
          <h4>{` ${comments} comments`}</h4>
        </RowDiv>
      </Respo_widget_contents>
    </Respo_widget>
  );
};

export default IssueListItem;
