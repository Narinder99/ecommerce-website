import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './core/Home';
import Menu from './core/Menu';
import Shop from './core/Shop';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCatogory';
import Cart from './core/Cart';
import Product from './core/Product';
import Orders from './admin/Orders';
import Profile from './user/Profile'
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import AddProduct from './admin/AddProduct';
const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signIn" exact component={SignIn} />
                    <Route path="/signUp" exact component={SignUp} />
                    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/create/category" exact component={AddCategory} />
                    <Route path="/shop" exact component={Shop} />
                    <Route path="/product/:productId" exact component={Product} />
                    <Route path="/cart" exact component={Cart} />
                    <AdminRoute path="/admin/orders" exact component={Orders} />
                    <PrivateRoute path="/profile/:userId" exact component={Profile} />
                    <PrivateRoute path="/admin/products" exact component={ManageProducts} />
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                    <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                    <AdminRoute path="/create/product" exact component={AddProduct} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default Routes;