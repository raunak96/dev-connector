const router = require("express").Router();
const isSignedIn = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/profile");
const User = require("../models/user");
const Post = require("../models/post");
const normalize = require("normalize-url");
const axios = require('axios');
const config=require('config');


// Create/update profile --- /api/profile
router.post("/",[
        isSignedIn, [check("status", "Status is required").notEmpty(),check("skills", "Mention atleast one skill").notEmpty()]  // middlewares
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const {company,location,website,bio,skills,status,githubusername,youtube,twitter,instagram,linkedin,facebook,} = req.body;

        const profileFields = {
            user: req.user,
            company,
            location,
            website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
            bio,
            skills: Array.isArray(skills)
                ? skills
                : skills.split(",").map((skill) => " " + skill.trim()),
            status,
            githubusername,
        };
        const socialfields = {youtube,twitter,instagram,linkedin,facebook,};

        for (const [key, value] of Object.entries(socialfields)) {
            if (value && value.length > 0)
                socialfields[key] = normalize(value, { forceHttps: true }); // adds https if not added by user to website urls
            else delete socialfields[key]; // if particular social account not there no need to add that key to socialfields
        }
        profileFields.social=socialfields;
       

        try {
                // Using upsert option (creates new doc if no match is found):
                let profile = await Profile.findOneAndUpdate(
                    { user: req.user },
                    { $set: profileFields },
                    { new: true, upsert: true }
                );
                res.json(profile);
            } 
        catch (error) {
            return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
        }
    }
);
// add user experience to profile --- /api/profile/experience
router.put("/experience", [
        isSignedIn,
        [
            check("title", "Title is required").notEmpty(),
            check("company", "Company is required").notEmpty(),
            check("from", "From date is required and needs to be from the past").notEmpty()
                
        ],
    ],async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const {title,company,location,from,to,current,description} = req.body;
        const newExp = {title,company,location,from,to,current,description}
        try {
            const profile = await Profile.findOne({user:req.user});
            if (!profile) {
                return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
            }
            profile.experience.unshift(newExp); // adds new array element to beginning unlike push
            await profile.save();
            return res.json(profile);

        } catch (error) {
            return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
        }
});
// remove an experience --- /api/profile/experience/:expId
router.put("/experience/:expId",isSignedIn,async(req, res)=>{
    try {

        const profile = await Profile.findOne({user:req.user});
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }
        const indexToRemove= profile.experience.findIndex(exp=>exp._id.toString()===req.params.expId.toString());
        if(indexToRemove==-1)
            return res.status(404).json({ errors: [{ msg: "No such experience added to Profile" }] });

        profile.experience.splice(indexToRemove,1);
        await profile.save();
        return res.json(profile);

    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
})
// add user education to profile --- /api/profile/education
router.put("/education", [
        isSignedIn,
        [
            check("school", "School is required").notEmpty(),
            check("degree", "Degree is required").notEmpty(),
            check("fieldofstudy", "Field of Study is required").notEmpty(),
            check("from", "From date is required and needs to be from the past").notEmpty()
                
        ],
    ],async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const {school,degree,fieldofstudy,from,to,current,description} = req.body;
        const newEdu = {school,degree,fieldofstudy,from,to,current,description} 
        try {
            const profile = await Profile.findOne({user:req.user});
            if (!profile) {
                return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
            }
            profile.education.unshift(newEdu); // adds new array element to beginning unlike push
            await profile.save();
            return res.json(profile);

        } catch (error) {
            return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
        }
});
// remove education  --- /api/profile/education/:eduId
router.put("/education/:eduId",isSignedIn,async(req, res)=>{
    try {

        const profile = await Profile.findOne({user:req.user});
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }
        const indexToRemove= profile.education.findIndex(edu=>edu._id.toString()===req.params.eduId.toString());
        if(indexToRemove==-1)
            return res.status(404).json({ errors: [{ msg: "No such education details added to Profile" }] });
        profile.education.splice(indexToRemove,1);
        await profile.save();
        return res.json(profile);

    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
})


// Get own profile ---- /api/profile/me
router.get("/me", isSignedIn, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user,
        }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// Get all Profiles --- /api/profile (Public route)
router.get("/",async(req,res)=>{
    try {
        const profiles= await Profile.find({}).populate('user',['name','avatar']);
        res.json(profiles);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// Get Profile by User id--- /api/profile/user/:userId (Public route)
router.get("/user/:userId",async(req,res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.userId,}).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile Not found" }] });
        }
        return res.json(profile);
    } catch (error) {
        if(error.kind==='ObjectId'){
            return res.status(404).json({ errors: [{ msg: "Profile Not found" }] });
        }
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// Delete profile,user,posts --- /api/profile
router.delete("/",isSignedIn,async(req,res)=>{
    try {
        await Post.deleteMany({user:req.user}); // delete posts
        await Profile.findOneAndRemove({user:req.user});  // delete profile
        await User.findByIdAndRemove(req.user); //delete user 
        return res.json({msg:"User Account Deleted permanently"});
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
});

// Get user repos from github --- /api/profile/github/:username(Public)
router.get('/github/:username',async(req, res)=>{
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
            "user-agent": "node.js",
            Authorization: `token ${config.get("githubToken")}`,
        };

        const gitHubResponse = await axios.get(uri, { headers });
        return res.json(gitHubResponse.data);
    } catch (err) {
        return res.status(404).json({errors:[{ msg: "No Github profile found" }]});
    }
})


module.exports = router;
