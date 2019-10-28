import React, {useCallback} from "react"
import {useHistory} from 'react-router'
import styles from './styles.module.less'
import avatar from 'assets/images/avatar.jpg'

const Blog:React.FC = () => {
  const history = useHistory()
  const goHome = useCallback(() => {
    history.push(`/home`)
  },[history])
  return (
    <div className={styles.index} onClick={goHome}>
      <img src={avatar} alt="" className={styles.avatar}/>
      <p>CarrotWu blog</p>
    </div>
  )
}
export default Blog
