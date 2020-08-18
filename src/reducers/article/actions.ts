import { getArticleList, GetArticleListParams } from 'services/article';
import { UPD_ARTICLE_LIST, UpdArticleAction } from './types';
import { ArticleListItem } from 'types/article';
import { Action } from 'redux';
import { AppState } from '../index';
import { ThunkAction } from 'redux-thunk';

//actionCreator
export function updArticle(articleList: ArticleListItem[]): UpdArticleAction {
  return {
    type: UPD_ARTICLE_LIST,
    payload: { articleList },
  };
}
// action
export const thunkUpdArticle = (
  params: GetArticleListParams,
): ThunkAction<void, AppState, null, Action<typeof UPD_ARTICLE_LIST>> => async (
  dispatch,
) => {
  const { data } = await getArticleList(params);
  dispatch(updArticle(data.list));
  return data;
};
