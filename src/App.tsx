import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import RouterMap from "routers/RouterMap"
import {Provider} from 'react-redux'
import store from "store"

fetch('/api/article/getArticleList')

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <RouterMap/>
      </Router>
    </Provider>
  )
}

export default App
