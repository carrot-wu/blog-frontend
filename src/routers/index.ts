import React from "react";
import Home from 'views/home'
import Post from 'views/post'
interface IRoute {
  key: string
  name: string
  path: string
  component?: React.FC
  render?: () => React.FC
}

const routerArray: IRoute[] = [
  {
    name: '首页',
    path: '/',
    key: 'index',
    component: Home
  },
  {
    name: '首页',
    path: '/home',
    key: 'home',
    component: Home
  },
  {
    name: '详情',
    path: '/post',
    key: 'post',
    component: Post
  }
]
export default routerArray
