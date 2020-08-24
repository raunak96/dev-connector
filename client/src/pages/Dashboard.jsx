import React,{useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile,deleteAccount } from "../redux/profile/profile.actions";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import ExperiencesList from '../components/dashboard/ExperiencesList';
import EducationsList from '../components/dashboard/EducationsList';

const Dashboard = ({getProfile,isLoading,profile,currentUser,deleteAccount}) => {
    useEffect(()=>{
        getProfile();
    },[getProfile]);

    return isLoading && profile===null ? <Spinner/>:(
        <Fragment>
            <div style={{display: 'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <p className="lead" style={{alignSelf:'flex-end'}}>
                <i className="fas fa-user text-center"></i> Welcome {currentUser && currentUser.name}
                </p>
                <h1 className="large text-primary text-center my-2">DashBoard</h1>
            </div>
            
            {profile!==null ?(
                <Fragment>
                    <div className='dash-buttons text-center'>
                        <Link to='/edit-profile' className='btn btn-warning mx-2' style={{color:'#212529'}}>
                            <i className='fas fa-user-edit text-warning' /> Edit Profile
                        </Link>
                        <Link to='/add-experience' className='btn btn-info mx-2'>
                            <i className='fab fa-black-tie' />  Add Experience
                        </Link>
                        <Link to='/add-education' className='btn btn-primary mx-2'>
                            <i className='fas fa-graduation-cap' /> Add Education
                        </Link>
                    </div>

                    <ExperiencesList experiences={profile.experience}/>
                    <EducationsList educationList={profile.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                            <i className="fas fa-user-minus"></i>&nbsp;Delete My Account
                        </button>
                    </div>
                </Fragment>
            ):(
                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-dark my-1">Create Profile</Link>
                </Fragment>
            )
        }
        </Fragment> 
    )
};

Dashboard.propTypes = {
    getProfile:PropTypes.func.isRequired,
    profile:PropTypes.object,
    isLoading: PropTypes.bool,
    currentUser: PropTypes.object,
    deleteAccount:PropTypes.func.isRequired
};
const mapStateToProps=({profile:{isLoading,profile},auth:{currentUser}})=>({
    profile,isLoading,currentUser
})

export default connect(mapStateToProps,{getProfile,deleteAccount})(Dashboard);