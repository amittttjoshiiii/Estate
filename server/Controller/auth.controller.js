import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const signup = async (req, res, next) => {
 const { username, email, password } = req.body;
 const hashedPassword = bcrypt.hashSync(password, 10)
 const newUser = new User({ username, email, password: hashedPassword });
 try {
  await newUser.save();
  res.status(200).json("User created sucessfully")
 }
 catch (err) {
  next(errorHandler(500, err.message));//using middleware situated at index.js for handling errors
 }
};


export const signin = async (req, res, next) => {
 const { email, password } = req.body;
 try {
  const validUser = await User.findOne({ email });
  if (!validUser) {
   return next(errorHandler(404, "User not found"));
  }

  const validPassword = bcrypt.compareSync(password, validUser.password);
  if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));

  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

  //for not showing password(hashed) in the response
  const { password: pass, ...rest } = validUser;

  res.cookie('access token', token, { httpOnly: true }).status(200).json(validUser);

 }
 catch (err) {
  next(err);
 }
}

export const google = async (req, res, next) => {
 try {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
   const { password: pass, ...rest } = user._doc;
   res.cookie('access token', token, { httpOnly: true }).status(200).json(rest);
  } else {
   //user does not exists so we create a user giving it a random password 
   const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
   const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
   const newUser = new User({
    //username should be unique
    username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
    email: req.body.email,
    password: hashedPassword,
    avatar: req.body.photo
   });

   await newUser.save();
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
   const { password: pass, ...rest } = newUser._doc;
   res.cookie('access token', token, { httpOnly: true }).status(200).json(rest);
  }
 }
 catch (err) {
 next(err);
 }
}