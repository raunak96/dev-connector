import axios from 'axios';
import authActionTypes from './auth.actionTypes';
import { setAlert } from '../alerts/alerts.actions';
import setAuthToken from '../../utils/setAuthToken';
import profileActionTypes from '../profile/actionTypes.profile';

const registerUserSuccessful = (tokenObj)=>({
    type: authActionTypes.REGISTER_SUCCESS,
    payload: tokenObj
});

const registerUserFailure = _ =>({
    type: authActionTypes.REGISTER_FAIL
});

const loginUserSuccessful = (tokenObj)=>({
    type: authActionTypes.LOGIN_SUCCESS,
    payload: tokenObj
});

const loginUserFailure = _ =>({
    type: authActionTypes.LOGIN_FAIL
});

export const registerUserStartAsync=({name,email, password})=>async dispatch=>{

    const config = { headers: {"Content-Type": "application/json"} };
        try {
            const response = await axios.post('/api/users',{name,email, password},config);
            dispatch(registerUserSuccessful(response.data));
            dispatch(getUserData());
        } catch (error) {
            const errors =error.response.data.errors;
            if(errors){
                errors.forEach(error=> dispatch(setAlert({alertType:'danger',msg:error.msg})))
            }
            dispatch(registerUserFailure());
        }
};

export const loginUserStartAsync=({email, password})=>async dispatch=>{

    const config = { headers: {"Content-Type": "application/json"} };
        try {
            const response = await axios.post('/api/auth',{email, password},config);
            dispatch(loginUserSuccessful(response.data))
            dispatch(getUserData());
        } catch (error) {
            const errors =error.response.data.errors;
            if(errors){
                errors.forEach(error=> dispatch(setAlert({alertType:'danger',msg:error.msg})))
            }
            dispatch(loginUserFailure());
        }
};

export const logout=()=>dispatch=>{
    dispatch({type:profileActionTypes.CLEAR_PROFILE});
    dispatch({type:authActionTypes.LOGOUT});
};

export const getUserData=()=> async dispatch=>{
    setAuthToken(localStorage.token);
    try {
        const response= await axios.get('/api/auth');
        dispatch({
            type: authActionTypes.FETCH_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({type:authActionTypes.FETCH_USER_FAIL});
    }
}

