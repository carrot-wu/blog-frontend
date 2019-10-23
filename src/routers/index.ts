import React from "react";
import Home from 'views/home'
import Post from 'views/post'
interface IRoute {
  key: string
  name: string
  path: string
  exact?: boolean
  redirect?: string
  component?: React.FC
  render?: (props: any) => React.ReactNode
}

const routerArray: IRoute[] = [
  {
    name: '首页',
    path: '/home',
    key: 'home',
    component: Home,
    exact: true
  },
  {
    name: '详情',
    path: '/post/:id',
    key: 'post',
    component: Post,
    exact: true
  }
]
export default routerArray
