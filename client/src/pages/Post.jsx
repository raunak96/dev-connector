import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../redux/post/post.actions';
import Spinner from '../components/Spinner';
import { useParams, Link } from 'react-router-dom';
import PostItem from '../components/posts/PostItem';
import AddComment from '../components/post/AddComment';
import CommentItem from '../components/post/CommentItem';

const Post = ({post:{post,isLoading},getPost}) => {
    const { id } = useParams();
    useEffect(()=>{
        getPost(id);
    },[getPost,id]);

    return isLoading || post===null ? <Spinner /> :(
        <Fragment>
            <Link to='/posts' className="btn btn-warning">Back to Posts</Link>
            <PostItem {...post} showDiscussion={false} />
            <AddComment postId={post._id} />
            <div className="comments">
            {post.comments.map(comment=>(
                <CommentItem key={comment._id} {...comment} postId={post._id}/> 
            ))}
            </div>
        </Fragment>
        
    )
};

const mapStateToProps = ({post})=>({
    post
})

export default connect(mapStateToProps,{getPost})(Post);