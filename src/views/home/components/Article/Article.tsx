import React, {memo, useMemo} from "react"
import {format} from 'date-fns'
import './style.less'
import {ArticleListItem} from 'types/article'

interface ArticleItemProps extends ArticleListItem {
  onClick: (id: number) => void
}
interface ImgWrapperStyle {
  backgroundImage: string;
  [index: string]: string | number
}

const Article: React.FC<ArticleItemProps> = (props) => {
  const {title, id, access, abstract, imgSrc, createdStamp} = props
  const imgStyle = useMemo<ImgWrapperStyle>(() => {
    return {backgroundImage: `url(${imgSrc})`}
  }, [imgSrc])

  const time = useMemo(() => format(new Date(createdStamp), 'yyyy-MM-dd HH:MM'), [createdStamp])
  return (
    <article className="article" onClick={() => props.onClick(id)}>
      <div className="title">{title}</div>
      <div className="detail">
        <div className="iconWrapper">
          <span className="iconfont icon-baifangjiluS"/>
          <span>carrotwu</span>
        </div>
        <div className="iconWrapper">
          <span className="iconfont icon-baifangtongjis"/>
          <span>{time}</span>
        </div>
        <div className="iconWrapper">
          <span className="iconfont icon-baifangS"/>
          <span>{`浏览记录${access}次`}</span>
        </div>
      </div>
      {imgSrc &&
      <div className="imgWrapper" style={imgStyle}/>
      }
      <div className="abstract">{abstract}</div>
    </article>
  )
}
export default memo(Article)
