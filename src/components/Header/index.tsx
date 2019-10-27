import React from 'react'
import styles from './styles.module.less'
import avatar from 'assets/images/avatar.jpg'
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <img className={styles.avatar} src={avatar} alt=""/>
        <div className={styles.menu}>
          <span className={styles.menuItem}>首页</span>
          <span className={styles.menuItem}>关于我</span>
        </div>
      </div>
    </header>
  )
}
