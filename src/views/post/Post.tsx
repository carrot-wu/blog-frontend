import React, {useEffect, useMemo} from "react"
import marked from 'marked'
import {useParams, useHistory} from 'react-router'
import usePromise from 'hooks/usePromise'
import {GetArticleDetailRes} from "@/types/article";
import {getArticleById} from 'services/article'
import './styles.less'

const Post:React.FC = () => {
  const {id} = useParams()
  const history = useHistory()
  const { loadFn: getArticleDetail, res: {data}, loading } = usePromise<GetArticleDetailRes>(
    async (id) => getArticleById({id}),
  );

  const {title, content = ''} = data
  const html = useMemo(() => marked(content),[content])
  useEffect(() => {
    if(!id){
      //不存在id
      history.replace('/home')
    }else {
      getArticleDetail(id)
    }
  }, [id])
  return (
    <div className="content">
      {loading ?
        <div>loading</div>
        :
        <div className="post">
          <div className="title">{title}</div>
          <div className="byline">
            <div className="author">carrotWu</div>
            <div className="time">这是时间</div>
          </div>
          <div className="markdown-body" dangerouslySetInnerHTML={{__html:html}}/>
        </div>
      }
    </div>
  )
}
export default Post
