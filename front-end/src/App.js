import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import UserProducts from './pages/UserProducts';
import UserCheckout from './pages/UserCheckout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ UserProfile } />
        <Route exact path="/products" component={ UserProducts } />
        <Route exact path="/checkout" component={ UserCheckout } />
      </Switch>
    </Router>
  );
}

export default App;
