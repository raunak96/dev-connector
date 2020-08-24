const router= require('express').Router();
const { check, validationResult } = require("express-validator");
const isSignedIn = require("../middleware/auth");
const Post = require("../models/post");
const User = require("../models/user");

// Create post --- /api/posts
router.post("/", [isSignedIn, [check('text', 'Text is required').notEmpty()]], async(req, res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user= await User.findById(req.user).select("-password"); // return all user fields except password
        
        const newPost=new Post({
            text:req.body.text,
            user:user._id, name: user.name, avatar: user.avatar,
        });
        const post=await newPost.save();
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// Get all posts --- /api/posts
router.get("/",isSignedIn,async(req, res)=>{
    try {
        const posts= await Post.find({}).sort({createdAt:-1}); //most recent post first 
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// Get post by id --- /api/posts/:id
router.get("/:id",isSignedIn,async(req, res)=>{
    try {
        const post= await Post.findById(req.params.id)
        if(!post)
            return res.status(404).json({errors:[{msg:"Post not found!"}]});
        return res.json(post);
    } catch (error) {
        if(error.kind==='ObjectId'){
            return res.status(404).json({ errors: [{ msg: "Post Not found!" }] });
        }
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});
// delete a post --- /api/posts/:id
router.delete("/:id",isSignedIn,async(req, res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({errors:[{msg:"Post not found!"}]});
        if(post.user.toString()!== req.user)
            return res.status(401).json({errors:[{msg:"You are not authorised to perform this action!"}]});
        
        else await post.remove(); 
        return res.json({msg:"Post successfully removed."});

    } catch (error) {
        if(error.kind==='ObjectId'){
            return res.status(404).json({ errors: [{ msg: "Post Not found!" }] });
        }
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// like a post --- /api/posts/like/:id (id of post)
router.put("/like/:id",isSignedIn,async(req, res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({errors:[{msg:"Post not found!"}]});
        if(post.likes.find(({user})=>user.toString()===req.user))
            return res.status(400).json({msg:"You have already liked this post!"});

        post.likes.unshift({user:req.user});
        await post.save();
        res.json(post.likes);

    } catch (error) {
        if(error.kind==='ObjectId'){
            return res.status(404).json({ errors: [{ msg: "Post Not found!" }] });
        }
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// unlike a post --- /api/posts/unlike/:id (id of post)
router.put("/unlike/:id",isSignedIn,async(req, res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({errors:[{msg:"Post not found!"}]});

        const indexToRemove = post.likes.findIndex(
            ({user}) => user.toString() === req.user
        );
        if(indexToRemove==-1)
            return res.status(400).json({errors:[{msg:"You have not liked this post!"}]});

        post.likes.splice(indexToRemove, 1);
        await post.save();
        res.json(post.likes);
        
    } catch (error) {
        if(error.kind==='ObjectId'){  // if id format is not like mongodb expects, then this error is thrown
            return res.status(404).json({ errors: [{ msg: "Post Not found!" }] });
        }
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// write a comment to post --- /api/posts/comment/:id
router.put("/comment/:id",[isSignedIn, [check('text', 'Text is required').notEmpty()]], async(req, res)=>{

    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user).select("-password");
        const post = await Post.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,avatar: user.avatar,user: req.user,
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
}); 

// delete a comment --- /api/posts/comment/:id/:commentId
router.put("/comment/:id/:commentId",isSignedIn,async(req, res)=>{
    try {
        const post= await Post.findById(req.params.id);
        const indexToRemove= post.comments.findIndex(comment=>comment._id.toString()===req.params.commentId && comment.user.toString()===req.user);
        if(indexToRemove==-1)
            return res.status(400).json({errors:[{msg:"You are not authorised to perform this action!"}]});
        post.comments.splice(indexToRemove,1);
        await post.save();
        return res.json(post.comments);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
})

module.exports = router;