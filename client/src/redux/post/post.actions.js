import axios from 'axios';
import postActionTypes from './post.actionTypes';
import { setAlert } from '../alerts/alerts.actions';

const startAction=()=> ({type:postActionTypes.START_ACTION});
const postFailure= error =>({type: postActionTypes.POST_ERROR,payload: error});

//Get posts
export const getPosts=_=>async dispatch=>{
    try {
        dispatch(startAction());
        const res= await axios.get("/api/posts");
        dispatch({ type:postActionTypes.GET_POSTS, payload:res.data });
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
    }
}
//Get post
export const getPost= id =>async dispatch => {
    try {
        dispatch(startAction());
        const res= await axios.get(`/api/posts/${id}`);
        dispatch({ type:postActionTypes.GET_POST, payload:res.data });
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

//Add Post
export const addPost=text=>async dispatch => {
    try {
        let res = await axios.post('/api/posts',text);
        dispatch({type: postActionTypes.ADD_POST, payload: res.data});
        dispatch(setAlert({msg:"You posted successfully",alertType:"success"}));
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
        const errors =error.response.data.errors;
            if(errors){
                errors.forEach(error=> dispatch(setAlert({alertType:'danger',msg:error.msg})))
        }
    }
}

// Delete Post
export const deletePost=postId=> async dispatch => {
    try {
        const res=await axios.delete(`/api/posts/${postId}`);
        dispatch({type: postActionTypes.DELETE_POST, payload: postId});
        dispatch(setAlert({msg:res.data.msg, alertType:'success'}));
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
    }
}

// Add comment
export const addComment = (postId,text) => async dispatch =>{
    try {
        const res= await axios.put(`/api/posts/comment/${postId}`,text);
        dispatch({type:postActionTypes.ADD_COMMENT, payload: {_id:postId,comments:res.data} });
        dispatch(setAlert({ msg: "Successfully Added your comment", alertType: "success" }));
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) =>
                dispatch(setAlert({ alertType: "danger", msg: error.msg }))
            );
        }
    }
}
// Remove comment
export const removeComment = (postId,commentId) => async dispatch =>{
    try {
        await axios.put(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({type:postActionTypes.DELETE_COMMENT, payload: commentId });
        dispatch(setAlert({ msg: "Successfully Removed your comment", alertType: "success" }));
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
    }
}
// Like Post
export const likePost = postId => async dispatch =>{
    try {
        const res= await axios.put(`/api/posts/like/${postId}`);
        dispatch({type:postActionTypes.UPDATE_LIKE, payload: {_id:postId,likes:res.data} });
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
        if(error.response.status===400)
            dispatch(setAlert({msg:'You have already like the post', alertType:'warning'}));
    }
}
// Remove Like Post
export const unLikePost = postId => async dispatch =>{
    try {
        const res= await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({type:postActionTypes.UPDATE_LIKE, payload: {_id:postId,likes:res.data} });
    } catch (error) {
        dispatch(postFailure({msg:error.response.statusText,status:error.response.status}));
        if(error.response.status===400)
            dispatch(setAlert({msg:'You have not liked the post yet', alertType:'warning'}));
    }
}