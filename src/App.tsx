import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import routerArray from "routers"
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        {routerArray.map(route => {
          return (
            <Route
              {...route}
            />
          )
        })}
      </Router>
    </div>
  )
}

export default App
