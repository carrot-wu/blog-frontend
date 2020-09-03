import React from 'react';
import Home from 'views/home';
import Post from 'views/post';
import Blog from 'views/blog';
import Tag from 'views/tag';
import TagList from 'views/tagList';
import Love from 'views/love';
interface IRoute {
  key: string;
  name: string;
  path: string;
  isCache?: boolean;
  exact?: boolean;
  redirect?: string;
  component?: React.FC;
  render?: (props: any) => React.ReactNode;
}

const routerArray: IRoute[] = [
  {
    name: '首页',
    path: '/',
    key: 'index',
    component: Blog,
    exact: true
  },
  {
    name: '博客',
    path: '/home',
    key: 'home',
    component: Home,
    isCache: true,
    exact: true
  },
  {
    name: '详情',
    path: '/post/:id',
    key: 'post',
    component: Post,
    exact: true
  },
  {
    name: '分类',
    path: '/tag',
    key: 'tag',
    component: Tag,
    exact: true
  },
  {
    name: '分类列表',
    path: '/tag/:key',
    key: 'tagList',
    component: TagList,
    exact: true
  },
  {
    name: '关于她',
    path: '/love',
    key: 'love',
    component: Love,
    isCache: true,
    exact: true
  }
];
export default routerArray;
