import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ UserProfile } />
      </Switch>
    </Router>
  );
}

export default App;
