import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "views/home";
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path='/' component={Home}></Route>
      </Router>
    </div>
  )
}

export default App
