import postActionTypes from "./post.actionTypes"

const INITIAL_STATE={
    posts:[],
    post:null,
    isLoading: true,
    error:{}
}

const postReducer=(state = INITIAL_STATE,action)=>{
    switch(action.type){
        case postActionTypes.START_ACTION:
            return {...state, isLoading:true, error: {}}
        case postActionTypes.GET_POSTS:
            return {...state, posts: action.payload, isLoading:false};
        case postActionTypes.GET_POST:
            return {...state, post: action.payload, isLoading:false};
        case postActionTypes.ADD_POST:
            return {
                ...state, error:{},posts: [action.payload,...state.posts]
        }
        case postActionTypes.POST_ERROR:
            return {...state,error:action.payload,isLoading: false};
        case postActionTypes.DELETE_POST:
            return {...state,
                posts: state.posts.filter(post=> post._id!==action.payload)
            };
        case postActionTypes.UPDATE_LIKE:
            return {...state, 
                posts: state.posts.map(post => post._id===action.payload._id ? {...post, likes:action.payload.likes} : post)
            }
        case postActionTypes.ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: action.payload.comments}
            };
        case postActionTypes.DELETE_COMMENT:
            return {
                ...state,
                post: {...state.post, 
                    comments: state.post.comments.filter(comment=>comment._id!==action.payload)
                }
            };
        default:
            return state;
    }
}

export default postReducer;