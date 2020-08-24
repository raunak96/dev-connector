import React, { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Provider } from "react-redux";
import store from "./redux/store";
import {BrowserRouter as Router,Route ,Switch} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Alert from "./components/Alert";
import {getUserData} from "./redux/auth/auth.actions"
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProfileForm from "./pages/profile-forms/ProfileForm";
import setAuthToken from "./utils/setAuthToken";
import AddExperience from "./pages/profile-forms/AddExperience";
import AddEducation from "./pages/profile-forms/AddEducation";
import Profiles from "./pages/Profiles";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

const App = () => {
    useEffect(()=>{
        setAuthToken(localStorage.token);
        store.dispatch(getUserData());
    },[]);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <section className="container">
                    <Alert /> 
                        <Switch>
                            <Route exact path="/login" component={Login} /> 
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/profile/:userId" component={Profile} />
                            <Route exact path="/profiles" component={Profiles} />
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/create-profile" component={ProfileForm} />
                            <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
                            <PrivateRoute exact path="/add-experience" component={AddExperience} />
                            <PrivateRoute exact path="/add-education" component={AddEducation} />
                            <PrivateRoute exact path="/posts" component={Posts} />
                            <PrivateRoute exact path="/post/:id" component={Post} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
