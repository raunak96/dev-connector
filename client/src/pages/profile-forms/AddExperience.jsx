import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addExperience } from "../../redux/profile/profile.actions";
const AddExperience = ({addExperience,history}) => {
    const [formData,setFormData]= useState({title:'',company:'',location:'',from:'',to:'',current:false,description:''});
    const [toDateDisabled,toggleToDateDisabled]=useState(false);
    const {title,company,location,from,to,current,description} = formData;

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        addExperience(formData,history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary text-center">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small className="text-danger">* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" required value={company} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={handleChange}/>
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
                    <textarea name="description" cols="30" rows="5" placeholder="Job Description"value={description} onChange={handleChange}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    );
};

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired
};

export default connect(null,{addExperience})(AddExperience);