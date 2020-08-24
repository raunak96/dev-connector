import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import {createProfile,getProfile} from '../../redux/profile/profile.actions';

import Spinner from '../../components/Spinner';
import { Link, Redirect } from 'react-router-dom';

const INITIAL_FORM_DATA={
        company: "",website: "",location: "",status: "",skills: "",githubusername: "",bio: "",twitter: "",facebook: "",linkedin: "",youtube: "",instagram: ""};

const ProfileForm = ({profile,isLoading,getProfile,createProfile,history,match}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	useEffect(()=>{
		if(!profile) getProfile();
		if (!isLoading && profile) {
            const profileData = { ...INITIAL_FORM_DATA};
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }
            for (const key in profile.social) {
                if (key in profileData) profileData[key] = profile.social[key];
            }
            if (Array.isArray(profileData.skills))
                profileData.skills = profileData.skills.join(", ");
			
			setFormData(profileData);
		}
	},[isLoading,getProfile,profile]);

	const handleChange=(e)=>{
		const {name,value}=e.target;
		setFormData({...formData,[name]:value})
  }
  const handleSubmit=(e)=>{
	  e.preventDefault();
	  createProfile(formData, history, profile ? true : false);
  }
	const {company,website,location,status,skills,githubusername,bio,twitter,facebook,linkedin,youtube,instagram,} = formData;

	if (match.path === "/create-profile" && profile)
		return <Redirect to="/edit-profile" />

	else if(match.path === "/edit-profile" && !profile && !isLoading)
		return <Redirect to="/create-profile" />;
		  
    return isLoading? <Spinner />:(
		<Fragment>
           <h1 className="large text-info text-center">
        {profile?"Edit":"Create"} Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> {profile ?"Add some changes to your profile":"Let's get some information to make your profile stand out"}
      </p>
      <small className="text-danger">* = required field</small>
      <form className="form" onSubmit={handleSubmit} >
        <div className="form-group">
          <select name="status" value={status} onChange={handleChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={handleChange}/>
          <small className="form-text">Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={handleChange}/>
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={handleChange} />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={handleChange} />
          <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={handleChange} />
          <small className="form-text">If you want your latest repos and a Github link, include yourusername</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={handleChange}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={()=>toggleSocialInputs(prevState=>!prevState)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
		{
			displaySocialInputs &&(
				<Fragment>
					<div className="form-group social-input">
						<i className="fab fa-twitter fa-2x"></i>
						<input type="text" placeholder="Twitter URL" name="twitter" value={twitter}  onChange={handleChange}/>
					</div>

					<div className="form-group social-input">
						<i className="fab fa-facebook fa-2x"></i>
						<input type="text" placeholder="Facebook URL" name="facebook" value={facebook}  onChange={handleChange}/>
					</div>

					<div className="form-group social-input">
						<i className="fab fa-youtube fa-2x"></i>
						<input type="text" placeholder="YouTube URL" name="youtube" value={youtube}  onChange={handleChange}/>
					</div>

					<div className="form-group social-input">
						<i className="fab fa-linkedin fa-2x"></i>
						<input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={handleChange}/>
					</div>

					<div className="form-group social-input">
						<i className="fab fa-instagram fa-2x"></i>
						<input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={handleChange}/>
					</div>
				</Fragment>
			)
		}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form> 
        </Fragment>
    );
};

ProfileForm.propTypes = {
	createProfile:PropTypes.func.isRequired,
	profile:PropTypes.object,
	isLoading: PropTypes.bool,
	getProfile:PropTypes.func.isRequired
};
const mapStateToProps = ({ profile: { profile, isLoading } }) => ({
    profile,isLoading
});
const mapDispatchToProps = (dispatch)=>({
	createProfile: (formData,history,edit)=>dispatch(createProfile(formData,history,edit)),
	getProfile: ()=>dispatch(getProfile())
})
export default connect(mapStateToProps,mapDispatchToProps)(ProfileForm);