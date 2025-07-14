const jwt = require("jsonwebtoken");

const generateToken= (userid, res)=>{
    
   const token= jwt.sign({userid}, process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    console.log("token generated");
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite: "strict",
    })
}

module.exports={generateToken};