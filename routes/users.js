const router = require("express").Router();
const gravatar=require('gravatar');
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');// to encrypt psswd
const jwt=require('jsonwebtoken');
const JWT_SECRET=require('config').get('jwtSecret');
const User = require("../models/user");

// register user --- /api/users/
router.post("/",
    [
        check("name","Name cannot be empty").notEmpty(),
        check("email","Please enter a valid Email").isEmail(),
        check('password','Password must be between 6-15 characters long').isLength({min:6,max:15}) 
    ],
    async (req, res) => {

        // Validations
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        const {name,email, password}=req.body;
        try {
            let user = await User.findOne({email});
            if(user)
                return res.status(400).json({errors:[{msg:'User already exists'}]});

            const avatar= gravatar.url(email,{   //Get gravatar
                s:'200',
                r:'pg',
                d:'mm'
            });
            user =new User({name,email,password,avatar});
            //Encrypt Password
            const salt=await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password,salt);
            
            await user.save(); 
            
            //Send jwtToken
            const token= jwt.sign({_id:user.id},JWT_SECRET,{expiresIn:3600}); // user.id also works instead of user._id in mongoose
            return res.status(201).json({token});
            
        } catch (error) {
            return res.status(500).json({errors:[{msg:'Internal Server Error'}]});
        }

    }
);

module.exports = router;
