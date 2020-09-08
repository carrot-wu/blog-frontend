import React from 'react';
import styles from './styles.module.scss';
export default function BottomBar() {
  const year: number = new Date().getFullYear();
  return (
    <footer className={styles.bottomWrapper}>
      <div>{`©2019-${year}`}</div>
      <div>Director by CarrotWu</div>
      <div>
        <a href="http://beian.miit.gov.cn">粤ICP备19128232号</a>
      </div>
    </footer>
  );
}
