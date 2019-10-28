import React from 'react'
import {Route} from 'react-router-dom'
import routerArray from "routers"
import CacheSwitch from 'components/CacheSwitch'

const RouterMap: React.FC = () => {
  return (
    <>
      <CacheSwitch include={['/home']}>
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
