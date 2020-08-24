import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {loginUserStartAsync} from "../redux/auth/auth.actions";
import PropTypes from "prop-types";


const Login = ({loginUserStartAsync,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        buttonText: "Login",
    });
    const { email, password, buttonText } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginUserStartAsync({email,password}); 
    };
    return isAuthenticated ? 
    (
        <Redirect to="dashboard" />
    ) : (
        <Fragment>
            <h1 className="large text-center text-info">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign In To Your Account
            </p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={handleChange} />
                </div>
                <input type="submit" className="btn btn-success" value={buttonText} onChange={handleChange} />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/Register">Register here.</Link>
            </p>
        </Fragment>
    );
};
Login.propTypes = {
    loginUserStartAsync:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}

const mapStateToProps = ({auth:{isAuthenticated}})=>({
    isAuthenticated
});

export default connect(mapStateToProps,{loginUserStartAsync})(Login);
