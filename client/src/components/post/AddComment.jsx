import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../redux/post/post.actions';

const AddComment = ({addComment,postId}) => {
    const [text,setText] = useState('');
    const [commentForm,toggleCommentForm]= useState(false);
    const [buttonText, setButtonText] = useState('Leave a Comment');

    const handleClick=()=>{
        toggleCommentForm(prevState=> !prevState);
        if (buttonText==="Leave a Comment") setButtonText("Hide Comment Form");
        else setButtonText("Leave a Comment");
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        addComment(postId,{text});
        setText('');
    }
    return (
        <div className="post-form">
            <button className="btn btn-info" onClick={handleClick}>
                {buttonText}
            </button>
            {
                commentForm && (
                    <form className="form my-1" onSubmit={handleSubmit}>
                        <textarea name="text" cols="30" rows="5" placeholder="Add a comment" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                        <input type="submit" className="btn btn-success my-1" value="Submit"/>
                    </form>
                )
            }
            
        </div>
    );
};

export default connect(null, { addComment })(AddComment);