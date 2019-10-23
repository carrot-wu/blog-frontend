import React, {memo} from "react"
import './style.scss'
import {ArticleListItem} from 'types/article'
interface ArticleItemProps  extends ArticleListItem{
  onClick: (id: number) => void
}

const Article: React.FC<ArticleItemProps> = (props) => {
  const {title, id, access} = props
  return (
    <article className="article" onClick={() => props.onClick(id)}>
      <div className="title">{title}</div>
      <div className="detail">
        <div>carrotWu</div>
        <div>2019-12-12</div>
        <div>{`浏览记录${access}次`}</div>
      </div>
    </article>
  )
}
export default memo(Article)
