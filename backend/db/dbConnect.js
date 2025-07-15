const mongoose = require("mongoose");

uri = process.env.URI || "mongodb+srv://adityakoundal228:a7bEC57dJoWBV8Mk@cluster0.wquz1ar.mongodb.net/"
const connectDB =  ()=>{
    mongoose.connect(uri);
    console.log(`connected to database`);
}

module.exports = {connectDB};