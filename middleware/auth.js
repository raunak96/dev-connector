const jwt=require('jsonwebtoken');
const JWT_SECRET=require('config').get('jwtSecret');

module.exports=(req,res,next)=>{
    const authorization=req.headers['authorization'];
    const token = authorization ? authorization.replace("Bearer ",""):''; // token of form: Bearer <token>

    if(!token){
        return res.status(401).json({errors:[{msg:'No token...Access denied!'}]});
    }
    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user=decoded._id;
        next();
    } catch (error) {
        res.status(401).json({errors:[{msg:'Token is not valid'}]});
    }
}