const mongoose = require("mongoose");

uri = process.env.URI
const connectDB =  ()=>{
    mongoose.connect(uri);
    console.log(`connected to database`);
}

module.exports = {connectDB};