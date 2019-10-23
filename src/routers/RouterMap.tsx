import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import routerArray from "routers"
import CacheRouter from 'components/CacheSwitch'

const RouterMap: React.FC = () => {
  return (
    <>
      <CacheRouter include={['/home']}>
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

      </CacheRouter>
    </>
  )
}

export default RouterMap
