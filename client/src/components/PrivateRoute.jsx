import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from "./Spinner";

const PrivateRoute = ({component: Component,isAuthenticated,isLoading,...otherProps}) => (
    <Route {...otherProps} render={props =>
        isLoading ? (
            <Spinner />
        ) : isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
    }
  />
);


PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
};
const mapStateToProps=({auth:{isAuthenticated,isLoading}})=>({
    isAuthenticated,isLoading
})
export default connect(mapStateToProps)(PrivateRoute);