const express = require("express");
const { connectDB } = require("./db/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();



dotenv.config();

PORT = 5000;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:"*",
  methods:['GET','POST','PUT','DELETE']
}))

const todolistRoute = require("./routes/todoList.route");
const userRoute = require("./routes/user.route");

app.use("/api/todolist",todolistRoute);
app.use("/api/user",userRoute);



const start = async () => {
  try {
    await connectDB();
    app.listen(PORT , ()=>{
        console.log(`server is runing on ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
};



start();
