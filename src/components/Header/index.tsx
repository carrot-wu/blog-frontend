import React from 'react';
import styles from './styles.module.scss';
import avatar from 'assets/images/avatar.jpg';
import { Link, useLocation } from 'react-router-dom';

interface HeaderLink {
  to: string;
  key: string;
  name: string;
}
const headerLinkItem: HeaderLink[] = [
  { to: '/home', key: 'home', name: '首页' },
  { to: '/tag', key: 'tag', name: '分类' },
  { to: '/love', key: 'love', name: '关于她' }
];

export default function Header() {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <img className={styles.avatar} src={avatar} alt="" />
        <div className={styles.menu}>
          {headerLinkItem.map((linkItem) => (
            <Link
              className={
                location.pathname === linkItem.to ? `${styles.menuItem} ${styles.selected}` : styles.menuItem
              }
              to={linkItem.to}
              key={linkItem.key}
            >
              {linkItem.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
