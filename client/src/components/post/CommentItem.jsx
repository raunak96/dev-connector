import React from 'react';
import { connect } from 'react-redux';
import { removeComment } from '../../redux/post/post.actions';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = ({removeComment,postId,currentUser,_id,text,name,avatar,user,date}) => {
    return (
        <div className="comment bg-light p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="dp"/>
                    <h4>{name}</h4>
                </Link>
            </div>
            <div> 
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">Posted On <Moment format="DD/MM/YYYY">{date}</Moment></p>
            </div>
            <div>
                { user===currentUser._id && (
                    <button className="btn btn-danger" type="button" onClick={()=> removeComment(postId,_id)}> <i className="fas fa-times"></i> </button>
                )}
            </div>
        </div>
    );
};
const mapStateToProps =({auth: {currentUser}})=>({
    currentUser
})
export default connect(mapStateToProps, { removeComment })(CommentItem);