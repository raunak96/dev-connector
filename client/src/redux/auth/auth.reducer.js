import authActionTypes from "./auth.actionTypes";
const INITIAL_STATE={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading: true,
    currentUser:null
}
const authReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {

        case authActionTypes.REGISTER_SUCCESS:
        case authActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,isLoading: false,...action.payload,isAuthenticated: true
            };
        case authActionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,currentUser: action.payload,isAuthenticated: true,isLoading: false
            }
        case authActionTypes.REGISTER_FAIL:
        case authActionTypes.LOGIN_FAIL:
        case authActionTypes.FETCH_USER_FAIL:
        case authActionTypes.LOGOUT:
        case authActionTypes.DELETED_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,isLoading: false,isAuthenticated: false,token:null,currentUser:null
            };
        default:
            return state
    }
};

export default authReducer;
