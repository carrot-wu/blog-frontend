import React from "react"
import styles from './styles.module.scss'

const Post:React.FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.post}>
        <div className={styles.title}>这是一个标题</div>
        <div className={styles.byline}>
          <div className={styles.author}>这是作者</div>
          <div className={styles.time}>这是时间</div>
        </div>
      </div>
    </div>
  )
}
export default Post
