import React, {useEffect, useMemo} from "react"
import marked from 'marked'
import useFormatDate from "hooks/useFormatDate";
import {Loading} from "components/index";
import {useHistory, useParams} from 'react-router'
import {usePromise, useTitle} from 'hooks'
import {GetArticleDetailRes} from "types/article";
import {getArticleById} from 'services/article'
import './styles.less'

const Prism = window && window.Prism
marked.setOptions({
  highlight(code: string, lang: any) {
    return Prism.highlight(code, Prism.languages[lang], lang)
  }
})
const Post:React.FC = () => {
  const {id} = useParams()
  const history = useHistory()
  const { loadFn: getArticleDetail, res: {data}, loading } = usePromise<GetArticleDetailRes>(
    async (id) => getArticleById({id}),
  );
  const {title, content = '', createdStamp} = data
  const time = useFormatDate(createdStamp)
  // 修改标题
  useTitle(title)
  useEffect(() => {
    if(!id){
      //不存在id
      history.replace('/home')
    }else {
      getArticleDetail(id)
    }
    // eslint-disable-next-line
  }, [id])

  const html = useMemo(() => marked(content),[content])
  return (
    <div className="content">
      {loading ?
        <div className="post-loading">
          <Loading size={50}>文章加载中</Loading>
        </div>
        :
        <div className="post">
          <div className="title">{title}</div>
          <div className="byline">
            <div className="author">carrotWu</div>
            <div className="time">{time}</div>
          </div>
          <div className="markdown-body" dangerouslySetInnerHTML={{__html:html}}/>
        </div>
      }

    </div>
  )
}
export default Post
