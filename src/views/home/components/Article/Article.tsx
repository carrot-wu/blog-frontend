import React, {memo} from "react"
import './style.less'
import {ArticleListItem} from 'types/article'
interface ArticleItemProps  extends ArticleListItem{
  onClick: (id: number) => void
}

const Article: React.FC<ArticleItemProps> = (props) => {
  const {title, id, access, abstract} = props
  return (
    <article className="article" onClick={() => props.onClick(id)}>
      <div className="title">{title}</div>
      <div className="detail">
        <div className="iconWrapper">
          <span className="iconfont icon-baifangjiluS"/>
          <span>carrotwu</span>
        </div>
        <div className="iconWrapper">
          <span className="iconfont icon-baifangtongjis"></span>
          <span>2019-12-12</span>
        </div>
        <div className="iconWrapper">
          <span className="iconfont icon-baifangS"></span>
          <span>{`浏览记录${access}次`}</span>
        </div>
      </div>
      <div className="abstract">{abstract}</div>
    </article>
  )
}
export default memo(Article)
