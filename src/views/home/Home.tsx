import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {AppState} from "reducers";
import {thunkUpdArticle} from "reducers/article/actions";
import {ArticleDefaultState} from 'reducers/article/types'
import BottomBar from "components/BottomBar"
import Header from "components/Header";
import Banner from "components/Banner";
import Article from "./components/Article/Article"
import './style.less'

const Home: React.FC = () => {
  const [pageNum] = useState(1)
  const [pageSize] = useState(10)
  const dispatch = useDispatch()
  const history = useHistory()
  // 获取state article信息
  const {
    articleIdList,
    articleMap
  } = useSelector<AppState, ArticleDefaultState>(state => state.article)
  const articleList = articleIdList.map(id => articleMap[id])
  const getArticleList = useCallback(
    () => dispatch(thunkUpdArticle({pageNum, pageSize})),
    [dispatch, pageNum, pageSize]
  )

  const goPost = useCallback((id) => {
    history.push(`/post/${id}`)
  },[history])
  useEffect(() => {
    getArticleList()
  }, [getArticleList])
  return (
    <div className="home">
      <Header/>
      <Banner/>
      <div className="homeContent">
        {articleList.map(article => (
          <Article key={article.id} {...article} onClick={() => goPost(article.id)}/>
        ))}
      </div>
      <BottomBar/>
    </div>
  )
}
export default Home
