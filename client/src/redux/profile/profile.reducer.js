import profileActionTypes from "./actionTypes.profile";

const INITIAL_STATE={
    profile:null,
    otherProfile:null,
    profiles:[],
    isLoading: true,
    errors:{},
    repos:[]
};

const profileReducer=(state = INITIAL_STATE,action)=>{
    switch(action.type){
        case profileActionTypes.GET_PROFILE_SUCCESS:
        case profileActionTypes.UPDATE_PROFILE:
            return{
                ...state,isLoading: false,profile:action.payload,errors:{}
            }
        case profileActionTypes.GET_ALL_PROFILES:
            return{
                ...state,profiles:action.payload,isLoading: false,errors:{},otherProfile:null
            }
        case profileActionTypes.GET_OTHERS_PROFILE:
            return{
                ...state,isLoading: false,otherProfile:action.payload,errors:{}
            }
        case profileActionTypes.GET_PROFILE_FAILURE:
            return{
                ...state,isLoading: false,errors:action.payload,profile:null
            }
        case profileActionTypes.CLEAR_PROFILE:
            return {...state,isLoading:false,repos:[],profile:null,errors:{}};
        case profileActionTypes.GET_REPOS:
            return {...state,isLoading: false,repos:action.payload}
        default:
            return state;
    }
}

export default profileReducer;

