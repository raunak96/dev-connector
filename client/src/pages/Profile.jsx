import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../redux/profile/profile.actions';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PropTypes from 'prop-types'
import ProfileTop from '../components/profile/ProfileTop';
import ProfileAbout from '../components/profile/ProfileAbout';
import ProfileExperience from '../components/profile/ProfileExperience';
import ProfileEducation from '../components/profile/ProfileEducation';
import GithubRepos from '../components/profile/GithubRepos';


const Profile = ({profile,auth,getProfileById}) => {
    const {userId} = useParams(); //gets the match.params
    useEffect(()=>{
        getProfileById(userId);
    },[getProfileById,userId]);

    return profile.isLoading || profile.otherProfile===null ? <Spinner />:(
        <Fragment>
            <Link to="/profiles" className="btn btn-dark">Back to Profiles</Link>
            { auth.isAuthenticated && !auth.isLoading && auth.currentUser._id=== profile.otherProfile.user._id && (
                <Link to="/edit-profile" className="btn btn-warning">Edit Profile</Link>
            )} 
            <div className="profile-grid my-1">
                <ProfileTop {...profile.otherProfile} />
                <ProfileAbout {...profile.otherProfile} />
                <ProfileExperience experiences={profile.otherProfile.experience} />
                <ProfileEducation educationList={profile.otherProfile.education} />
            </div> 
            { profile.otherProfile.githubusername &&  <GithubRepos githubusername={profile.otherProfile.githubusername}/>}
        </Fragment>
    )
};
Profile.propTypes={
    profile:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}
const mapStateToProps=({profile,auth})=>({
    profile,auth
})

export default connect(mapStateToProps,{getProfileById})(Profile);