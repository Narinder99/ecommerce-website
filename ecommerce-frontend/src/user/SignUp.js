import React, { useState } from 'react';
import Layout from '../core/Layout';
import { signUp } from '../auth/index'
import { Link } from 'react-router-dom';
const SignUp = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signUp({ name, email, password })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: '',
                        password: '',
                        error: '',
                        success: true,
                    })
                }
            })
    }
    const showError = () => (
        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? '' : 'none' }}>
            {error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signIn">SignIn</Link>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
    const SignUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

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
                {showSuccess()}
                {SignUpForm()}
                {/* {JSON.stringify(values)} */}
            </Layout>
        </div>
    )
}

export default SignUp;