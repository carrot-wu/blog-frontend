import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import routerArray from "routers"
import CacheSwitch from 'components/CacheSwitch'

const RouterMap: React.FC = () => {
  return (
    <>
      <CacheSwitch include={['/home']}>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
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
