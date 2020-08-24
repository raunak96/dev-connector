import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAllProfiles} from "../redux/profile/profile.actions"
import Spinner from '../components/Spinner';
import ProfilesItem from '../components/ProfilesItem';
const Profiles = ({profile:{profiles,isLoading},getAllProfiles}) => {
    useEffect(()=>{
        getAllProfiles();
    },[getAllProfiles]);

    return isLoading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="text-primary text-center large">Developers</h1>
            <p className="lead text-info">
                 <strong><i className="fab fa-connectdevelop" /><em>Browse and connect with developers</em></strong>
            </p>
            <div className="profiles">
                {profiles.length ? (
                    profiles.map((profile) => (
                        <ProfilesItem key={profile._id} {...profile} />
                    ))
                ) : (
                    <h4>No profiles found...</h4>
                )}
            </div>
        </Fragment>
    );
};

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles:PropTypes.func.isRequired,
};
const mapStateToProps= ({profile})=>({
    profile
})
export default connect (mapStateToProps,{getAllProfiles})(Profiles);