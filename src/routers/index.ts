import React from "react";
import Home from 'views/home'
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
  }
]
export default routerArray
