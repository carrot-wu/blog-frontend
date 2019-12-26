import React from 'react'
import {Route} from 'react-router-dom'
import routerArray from "routers"
import CacheSwitch from 'components/CacheSwitch'

const RouterMap: React.FC = () => {
  const includePath = routerArray.reduce((array, cur) => {
    const {isCache, path} = cur
    if(isCache){
      array.push(path)
    }
    return array
  },[] as string[])
  return (
    <>
      <CacheSwitch include={includePath}>
        {routerArray.map(route => {
          return (
            <Route
              {...route}
            />
          )
        })}

      </CacheSwitch>
    </>
  )
}

export default RouterMap
