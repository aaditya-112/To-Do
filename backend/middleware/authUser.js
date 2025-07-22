const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model")

const authUser = async (req, res, next)=>{
    const token = req.cookies.jwt;
    
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    };
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log(decoded);
       req.user= await userModel.findById(decoded.userId)
    } catch (error) {
        return res.status(401).json({message:`${error.message}`})
    }

    next();
}
module.exports=authUser;