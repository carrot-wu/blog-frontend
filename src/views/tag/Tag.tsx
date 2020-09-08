import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.less';
import { AppState } from 'reducers';
import { TagDefaultState } from 'reducers/tag/types';
import { TagItem } from 'types/tag';
import { thunkUpdTag } from 'reducers/tag/actions';
import { Link, useHistory } from 'react-router-dom';
import { Header, Article } from 'components';

const articleList: any[] = [];
const Tag: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tagList, tagMap } = useSelector<AppState, TagDefaultState>((state) => state.tag);
  const getTagList = useCallback(async () => dispatch((thunkUpdTag() as unknown) as Promise<TagItem[]>), [
    dispatch
  ]);
  // 跳转详情
  const goPost = useCallback(
    (id) => {
      return () => history.push(`/post/${id}`);
    },
    [history]
  );

  useEffect(() => {
    getTagList();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="tag-wrapper">
      <Header />
      <div className="tag-content">
        <div className="tag-title">全部分类</div>
        <div className="tag-center">
          <div className="tag-list">
            {tagList.map((tag) => (
              <Link className="tag-item" key={tag} to={`/tag/${tagMap[tag].value}`}>
                {tag}
              </Link>
            ))}
          </div>
          <div className="tag-article-list">
            {articleList.map((article) => (
              <Article key={article.id} {...article} onClick={goPost(article.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tag;
