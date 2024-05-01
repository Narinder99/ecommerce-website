import React, { useState } from 'react';
import Layout from '../core/Layout';
import { signIn, authenticate, isAuthenticate } from '../auth/index'
import { Redirect } from 'react-router-dom';
const SignIn = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirect: false
    });

    const { email, password, error, loading, redirect } = values;
    const { user } = isAuthenticate
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signIn({ email, password })
            .then((data) => {
                if (data.err) {
                    setValues({ ...values, error: data.err, loading: false })
                }
                else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirect: true,
                        })
                    })
                }
            })
    }
    const showError = () => (
        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? '' : 'none' }}>
            {error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )

    )
    const redirectUser = () => {
        if (redirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }
            else {
                return <Redirect to="/user/dashboard" />
            }
        }

        if (isAuthenticate()) {
            return <Redirect to="/" />
        }
    }
    const SignUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
    )
    return (
        <div>
            <Layout title="SignUp Page" description=" Node React E-Commerce App" className="container col-md-8 offset-md-2" >
                {showError()}
                {showLoading()}
                {SignUpForm()}
                {redirectUser()}
                {/* {JSON.stringify(values)} */}
            </Layout>
        </div>
    )
}

export default SignIn;