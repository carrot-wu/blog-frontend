export interface ArticleListItem {
  abstract: string
  access?: number
  createdStamp: string
  id: number
  isNature: number
  tag: string
  title: string
  type: number
  imgSrc: string
}

export interface GetArticleListRes {
  count: number
  currentPage: number
  list: ArticleListItem[]
  totalPage: number
  pageSize: number
}

export interface GetArticleDetailRes {
  abstract: string
  access: number
  content: string
  createdStamp: string
  id: number
  isNature: number
  tag: string
  title: string
  type: number
  imgSrc: string
}
