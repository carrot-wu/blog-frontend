import request from 'utils/request'
import { GetArticleListRes, GetArticleDetailRes } from 'types/article'

export interface GetArticleListParams {
  pageNum: number;
  pageSize: number;
}
export interface GetArticleDetailParams {
  id: string
}
export async function getArticleList(params: GetArticleListParams) {
  return request.get<GetArticleListRes>('article/getArticleList', {
    ...params
  })
}

export async function getArticleById(params: GetArticleDetailParams) {
  return request.get<GetArticleDetailRes>('article/findArticleById', {
    ...params
  })
}
