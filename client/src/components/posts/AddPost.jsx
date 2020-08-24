import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux/post/post.actions';

const AddPost = ({addPost}) => {
    const [text,setText]= useState('');

    const handleSubmit = e =>{
        e.preventDefault();
        addPost({text});
        setText("");
    };
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Something on your mind...Write a post below</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit}>
                <textarea name="text" cols="30" rows="5" placeholder="Create a post" value={text} onChange={(e)=>setText(e.target.value)}></textarea>
                <input type="submit" className="btn btn-success my-1" value="Submit" />
            </form>
        </div>
    );
};

export default connect(null, { addPost })(AddPost);