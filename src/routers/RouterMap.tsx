import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routerArray from "routers"
const RouterMap: React.FC = () => {
  return (
    <Switch>
      {routerArray.map(route => {
        return (
          <Route
            exact
            {...route}
          />
        )
      })}

    </Switch>
  )
}

export default RouterMap
