const jwt = require("jsonwebtoken");


const generateToken= async (userId, res)=>{
    
   const token= jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    // console.log("tokken is",token);
    res.cookie("jwt", token,{
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        path:"/",
        secure: false,
    })
    
    return token;
}

module.exports={generateToken};