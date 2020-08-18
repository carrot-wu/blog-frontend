import { ArticleListItem } from 'types/article';
export interface ArticleMap {
  [index: number]: ArticleListItem;
}

export interface ArticleDefaultState {
  articleIdList: number[];
  articleMap: ArticleMap;
}
// action type
export const UPD_ARTICLE_LIST = 'UPD_ARTICLE_LIST';

// action
export interface UpdArticleAction {
  type: typeof UPD_ARTICLE_LIST;
  payload: {
    articleList: ArticleListItem[];
  };
}

export type UpdArticleActionType = UpdArticleAction;
