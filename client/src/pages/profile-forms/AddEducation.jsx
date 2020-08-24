import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addEducation } from "../../redux/profile/profile.actions";
const AddEducation = ({addEducation,history}) => {
    const [formData,setFormData]= useState({school:'',degree:'',fieldofstudy:'',from:'',to:'',current:false,description:''});
    const [toDateDisabled,toggleToDateDisabled]=useState(false);
    const {school,degree,fieldofstudy,from,to,current,description} = formData;

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        addEducation(formData,history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary text-center">
                Add Your Education Details
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school/college that you have attended
            </p>
            <small className="text-danger">* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* School/College" name="school" required value={school} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" required value={degree} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Field of Study" name="fieldofstudy" required value={fieldofstudy} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e)=>{
                        setFormData((prevState)=>({...prevState,current:!prevState.current}));
                        toggleToDateDisabled((prevState)=>!prevState);
                    }}/>&nbsp;Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={handleChange} disabled={toDateDisabled?'disabled':''}/> 
                </div>
                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Program Description"value={description} onChange={handleChange}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    );
};

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired
};

export default connect(null,{addEducation})(AddEducation);