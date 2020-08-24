import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePost, unLikePost, deletePost } from '../../redux/post/post.actions';

const PostItem = ({auth,_id,text,name,avatar,user,likes,comments,createdAt,likePost,unLikePost,deletePost,showDiscussion}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="pic"/>
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">Posted on <Moment format="DD/MM/YYYY">{createdAt}</Moment></p>
                
                {showDiscussion && (
                    <Fragment>
                        <button type="button" className="btn btn-light" onClick={()=> likePost(_id)}>
                            <i className="fas fa-thumbs-up"></i>
                            {likes.length>0 && <span> {likes.length}</span>}
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=> unLikePost(_id)}>
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion {comments.length>0 && (<span className="comment-count">{comments.length}</span>) }
                        </Link>
                        { !auth.isLoaded && auth.currentUser._id === user && (
                            <button type="button" className="btn btn-danger" onClick={()=>deletePost(_id)} >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};
PostItem.defaultProps = {
    showDiscussion:true   // tells whether to show Discussion button (will be false if already in discussion page)
}
const mapStateToProps = state=>({
    auth : state.auth
})

export default connect(mapStateToProps, { likePost, unLikePost,deletePost })(PostItem);