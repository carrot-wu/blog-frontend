import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {AppState} from "@/reducers"
import useInfinite, {LoadFnInterface} from "@/hooks/useInfinite";
import {thunkUpdArticle} from "@reducers/article/actions"
import {ArticleDefaultState} from '@reducers/article/types'
import {ArticleListItem, GetArticleListRes} from '@type/article'
import {BottomBar, Banner, Header, Button, Loading, BottomLine, Article} from "@/components"
import './style.less'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // 获取state article信息
  const {
    articleIdList,
    articleMap
  } = useSelector<AppState, ArticleDefaultState>(state => state.article)
  const articleList = articleIdList.map(id => articleMap[id])
  //定义无线加载类型
  const getArticleList = useCallback<LoadFnInterface<ArticleListItem>>(
    async ({pageSize, pageNum}) => dispatch(thunkUpdArticle({
      pageNum,
      pageSize
    }) as unknown as Promise<GetArticleListRes>),
    [dispatch]
  )
  //封装分页详情
  const {load, hasMore, loading} = useInfinite(getArticleList, {pageSize: 5, immediate: true})
  // 跳转详情
  const goPost = useCallback((id) => {
    return () => history.push(`/post/${id}`)
  }, [history])
  return (
    <div className="home">
      <Header/>
      <Banner/>
      <div className="homeContent">
        {articleList.map(article => (
          <Article key={article.id} {...article} onClick={goPost(article.id)}/>
        ))}
        <div className="loadBar">
          {loading ? (
            <Loading>加载中...</Loading>
          ) : (
            hasMore ? (
              <Button onClick={load} >加载更多</Button>
            ) : <BottomLine lineWidth={100}/>
          )
          }
        </div>
      </div>
      <BottomBar/>
    </div>
  )
}
export default Home
