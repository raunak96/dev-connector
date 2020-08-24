import profileActionTypes from "./actionTypes.profile";
import axios from "axios";
import { setAlert } from "../alerts/alerts.actions";
import authActionTypes from "../auth/auth.actionTypes";


const getProfileSuccess = (profile) => ({
    type: profileActionTypes.GET_PROFILE_SUCCESS,
    payload: profile,
});
const getProfileFailure = (errors) => ({
    type: profileActionTypes.GET_PROFILE_FAILURE,
    payload: errors,
});
const updateProfile=(profile)=>({
    type: profileActionTypes.UPDATE_PROFILE,
    payload: profile
})

const getOthersProfile=(profile)=>({
    type:profileActionTypes.GET_OTHERS_PROFILE,
    payload: profile
})

export const getProfile=()=>async dispatch=>{    // no need to set axios headers as it was already set when we got user data on App component mount using setAuthToken
    try {
        let response = await axios.get("/api/profile/me");
        dispatch(getProfileSuccess(response.data));
    } catch (error) {
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Create/update Profile
export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    try {
        const response = await axios.post("/api/profile",formData,config);
        dispatch(getProfileSuccess(response.data));
        dispatch(setAlert({alertType:"success",msg:edit?"Profile Updated":"Profile Created"}));
        if(!edit)
            history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) =>
                dispatch(setAlert({ alertType: "danger", msg: error.msg }))
            );
        }
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Add experience to profile
export const addExperience=(formData, history)=>async dispatch=>{
    try {
        const response = await axios.put("/api/profile/experience",formData);
        dispatch(updateProfile(response.data));
        dispatch(setAlert({alertType:"success",msg:"Experience added successfully"}));
        history.push("/dashboard");
        
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) =>
                dispatch(setAlert({ alertType: "danger", msg: error.msg }))
            );
        }
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Add education to profile
export const addEducation=(formData, history)=>async dispatch=>{
    try {
        const response = await axios.put("/api/profile/education",formData);
        dispatch(updateProfile(response.data));
        dispatch(setAlert({alertType:"success",msg:"Education added successfully"}));
        history.push("/dashboard");

    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) =>
                dispatch(setAlert({ alertType: "danger", msg: error.msg }))
            );
        }
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Delete Experience
export const deleteExperience=(id)=> async dispatch =>{
    try {
        const response = await axios.put(`/api/profile/experience/${id}`);
        dispatch(updateProfile(response.data));
        dispatch(setAlert({alertType:"success",msg:"Experience Removed successfully"}));
    } catch (error) {
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}
// Delete Education
export const deleteEducation=(id)=> async dispatch =>{
    try {
        const response = await axios.put(`/api/profile/education/${id}`);
        dispatch(updateProfile(response.data));
        dispatch(setAlert({alertType:"success",msg:"Education Removed successfully"}));
    } catch (error) {
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Delete profile and account
export const deleteAccount=()=>async dispatch => {
    if(window.confirm('Are you sure? This action cannot be undone!')){
        try {
            const response = await axios.delete('/api/profile');
            dispatch({type:profileActionTypes.CLEAR_PROFILE});
            dispatch({type:authActionTypes.DELETED_ACCOUNT});
            dispatch(setAlert({alertType:"danger",msg:response.data.msg}));

        } catch (error) {
            dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
        }
    }
}

// Get all profiles
export const getAllProfiles=()=>async dispatch=>{
    try {
        const response = await axios.get('/api/profile');
        dispatch({type:profileActionTypes.GET_ALL_PROFILES,payload:response.data})

    } catch (error) {
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Get profile id
export const getProfileById=(userId)=>async dispatch=>{
    try {
        const response = await axios.get(`/api/profile/user/${userId}`);
        dispatch(getOthersProfile(response.data));
    } catch (error) {
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Get git repos
export const getGithubRepos=(githubUsername)=>async dispatch=>{
    try {
        const response = await axios.get(`/api/profile/github/${githubUsername}`);
        dispatch({type:profileActionTypes.GET_REPOS,payload:response.data});
    } catch (error) {
        dispatch(getProfileFailure({msg:error.response.statusText,status:error.response.status}));
    }
}
