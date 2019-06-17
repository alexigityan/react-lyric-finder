import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from './context.js'

import Navbar from './components/layout/Navbar.js'
import Index from './components/layout/Index.js'
import Lyrics from './components/tracks/Lyrics.js'

import './App.css';

function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>

          </div>

        </React.Fragment>
      </Router>
    </Provider>

  );
}

export default App;
