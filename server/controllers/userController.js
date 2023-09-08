import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";



const handleSignin = expressAsyncHandler(async (req, res) => {

  const user = await User.findOne({ email: req.body.email });
  
  if (user) {
    const isMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    
    if (isMatched) {
      res.send({
        _id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});


const handleSignUp = expressAsyncHandler(async (req, res) => {
  const isExsit = await User.findOne({ email: req.body.email });
  if (isExsit) {
    return res.status(400).json({ error: "User already exists" });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  }
});
export { handleSignin, handleSignUp };
