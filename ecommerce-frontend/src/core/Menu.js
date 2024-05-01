import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticate } from '../auth/index';
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => (
    <div >
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
            </li>
            {!isAuthenticate() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signIn" style={isActive(history, '/signIn')}>SignIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signUp" style={isActive(history, '/signUp')}>SignUp</Link>
                    </li>
                </>
            )}

            {isAuthenticate() && isAuthenticate().user?.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>DashBoard</Link>
                </li>
            )}

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>



            {isAuthenticate() && isAuthenticate().user?.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>DashBoard</Link>
                </li>
            )}

            <li className="nav-item">
                <Link className="nav-link" to="/shop" style={isActive(history, '/shop')}>Shop</Link>
            </li>

            {isAuthenticate() && (
                <li className="nav-item">
                    <span className="nav-link"
                        to="/signUp"
                        style={{ cursor: 'pointer', color: '#ffffff' }}
                        onClick={() => {
                            signOut(() => {
                                history.push('/');
                            });
                        }}
                    >SignOut</span>
                </li>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);