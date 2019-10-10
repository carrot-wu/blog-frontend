import React from 'react'
import styles from './styles.module.scss'
export default function BottomBar() {
  const year:number = (new Date()).getFullYear()
  return (
    <footer className={styles.bottomWrapper}>
      <div>{`©2019-${year}`}</div>
      <div>Director by CarrotWu</div>
      <div>粤ICP备19128232号</div>
    </footer>
  )
}
