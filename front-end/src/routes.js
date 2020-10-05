import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Index';
import Register from './pages/Register/Index';
import UserProfile from './pages/UserProfile/Index';
import UserProducts from './pages/UserProducts/Index';
import UserCheckout from './pages/UserCheckout/Index';
import UserOrders from './pages/UserOrders/Index';
import AdminProfile from './pages/AdminProfile/Index';
import AdminOrders from './pages/AdminOrders/Index';
import AdminOrdersDetails from './pages/AdminOrdersDetails/Index';
import UserOrdersDetails from './pages/UserOrdersDetails/Index';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ UserProfile } />
        <Route exact path="/products" component={ UserProducts } />
        <Route exact path="/checkout" component={ UserCheckout } />
        <Route exact path="/orders/:id" component={ UserOrdersDetails } />
        <Route exact path="/orders" component={ UserOrders } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/admin/orders/:id" component={ AdminOrdersDetails } />
      </Switch>
    </Router>
  );
}

export default Routes;
