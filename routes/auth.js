const router = require("express").Router();
const isSignedIn= require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');// to encrypt psswd
const jwt=require('jsonwebtoken');
const JWT_SECRET=require('config').get('jwtSecret');
const User = require("../models/user");

// get User--- /api/auth
router.get("/", isSignedIn,async (req, res) => {
    try {
        let user=await User.findById(req.user).select('-password'); //will not return password field
        res.json(user);
    } catch (error) {
        return res.status(500).json({errors:[{msg:'Internal Server Error'}]});
    }
});

// Login User --- /api/auth 
router.post("/",
    [
        check("email","Please enter a valid Email").isEmail(),
        check('password','Password is required').exists() 
    ],
    async (req, res) => {

        // Validations
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        const {email, password}=req.body;
        try {
            let user = await User.findOne({email});
            if(!user)
                return res.status(400).json({errors:[{msg:'Please check your email and/or password'}]});
            const isMatch= await bcrypt.compare(password,user.password);
            if(!isMatch)
                return res.status(400).json({errors:[{msg:'Please check your email and/or password'}]});
            
            //Send jwtToken
            const token= jwt.sign({_id:user.id},JWT_SECRET,{expiresIn:18000});
            return res.status(201).json({token});
            
        } catch (error) {
            return res.status(500).json({errors:[{msg:'Internal Server Error'}]});
        }

    }
);
module.exports = router;
