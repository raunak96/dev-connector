import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { setAlert } from '../redux/alerts/alerts.actions';
import {registerUserStartAsync} from "../redux/auth/auth.actions";
import PropTypes from 'prop-types'

const Register = ({setAlert,registerUserStartAsync,isAuthenticated}) => {
    const [formData,setFormData]= useState({name:'',email:'',password:'',password2:'',buttonText:'Register'});
    const {name,email, password,password2, buttonText}=formData;

    const handleChange = (e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(password !== password2){
            setAlert({msg:"Passwords don't match",alertType:"danger"});
        }else{
            registerUserStartAsync({name,email, password}); 
        }
    }
    return isAuthenticated ? (
        <Redirect to="/dashboard" />
    ):(
        <Fragment>
            <h1 className="large text-primary text-center">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange}/>
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={password2} onChange={handleChange}/>
                </div>
                <input type="submit" className="btn btn-primary" value={buttonText} onChange={handleChange}/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};
Register.propTypes = {
    setAlert:PropTypes.func.isRequired,
    registerUserStartAsync:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
    isAuthenticated
});

export default connect(mapStateToProps,{setAlert,registerUserStartAsync})(Register);