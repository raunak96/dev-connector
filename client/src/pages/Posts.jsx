import React, { useEffect, Fragment } from 'react';
import { connect} from 'react-redux';
import { getPosts } from '../redux/post/post.actions';
import Spinner from "../components/Spinner";
import PostItem from '../components/posts/PostItem';
import AddPost from '../components/posts/AddPost';

const Posts = ({getPosts,posts,isLoading}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])
    return isLoading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the Community
            </p>
            <AddPost /> 
            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} {...post}/>
                ))}
            </div>
        </Fragment>
    );
};
const mapStateToProps=({post:{posts,isLoading}})=>({
    posts,isLoading
});
export default connect(mapStateToProps,{getPosts})(Posts);