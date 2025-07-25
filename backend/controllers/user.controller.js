const UserModel = require("../model/user.model");
const { registerValidation } = require("../validation/user.validatio");
const bcrypt = require("bcrypt");
const { generateToken } = require("../jwt/jwtToken");

const signup = async (req, res) => {
  try {
    const result = await registerValidation.validateAsync(req.body);
    const { username, email, password } = result;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(400).json({ message: "email already exists" });
    }
    const hasspassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hasspassword,
    });
    await newUser.save();
    if (newUser) {
      const token = await generateToken(newUser._id, res);
      res.status(201).json({ message: "new user added", newUser, token });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: `${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const ispasswordCorrect = await bcrypt.compare(password, user.password);

    if (!ispasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await generateToken(user._id, res);
    res.status(200).json({ message: "login successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict", 
      secure: false, 
      path: "/", 
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = { signup, login, logout };
