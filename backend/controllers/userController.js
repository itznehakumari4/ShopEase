/**
The main HTTP request methods are:

GET: Used to retrieve a resource from the server.
POST: Used to submit data to be processed by the server.
PUT: Used to update or replace a resource on the server.
DELETE: Used to request the removal of a specified resource on the server.

**/

import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import checkPassword from "../utils/passwordChecker.js";
import encryptPassword from "../utils/encrypter.js";
import Order from "../models/orderModel.js";

// @desc        Auth User and get Token
// @route       POST /api/users/login
// @access      Public (Anyone can access this domain)
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // parsing the data sent by user as credentials

  const user = await User.findOne({ email: email }); // find the user with this email

  if (user && (await checkPassword(user, password))) {
    // if user exists and password matches
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc        Get user profile with orders(if any)
// @route       GET /api/users/profile
// @access      Private (Only user can access this domain)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // getting it from PROTECT middleware after verifying token

  if (user) {
    const userOrders = await Order.find({ user: req.user._id });

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      orderList: userOrders || [], // if no userOrdersr, use an empty array
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc        Register new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // parsing the data sent by user as credentials while registering

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const userExists = await User.findOne({ email: email }); // check if exists

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const encryptedPassword = await encryptPassword(password); // Encrypt the password

  //  Model.create() method is used to create a new document in MongoDB based on the defined schema.
  //  It simplifies the process of creating a new document by allowing you to pass an object with the
  //  desired field values as an argument.
  const user = await User.create({
    // creating the user
    name: name,
    email: email,
    password: encryptedPassword, // save this encrypted password
  });

  if (user) {
    // if user is successfully created
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private (Only user can access this domain)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // getting it from previous middleware, protect middleware

  if (user) {
    // if user exists
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const encryptedPassword = await encryptPassword(req.body.password); // Encrypt the password
      user.password = encryptedPassword;
    }
    const updatedUser = await user.save(); // method is used to save the updated user object to the database, thereby persisting the changes made to the user object.
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/*******************************************ADMIN PRIVELEGE CONTROLLERS****************************************/

// @desc        Get ALL users(for admins)
// @route       GET /api/users
// @access      Private (Only admins can access this domain)
const getAllUsersProfile = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users); // sending all users
});

// @desc        Delete user(for admins)
// @route       DELETE /api/users/:userToBeDeletedId
// @access      Private (Only admins can access this domain)
const deleteUserProfile = asyncHandler(async (req, res) => {
  const DeletedUser = await User.findByIdAndDelete(req.params.id);
  if (DeletedUser) {
    res.send(DeletedUser); // deleted successfully
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc        Get user by ID(for admins)
// @route       GET /api/users/:userToShowid
// @access      Private (Only admins can access this domain)
const getUserProfileByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password"); // do not fetch password
  if (user) {
    res.send(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc        Update user (Done by Admins)
// @route       PUT /api/users/:userToUpdateid
// @access      Private (Only user can access this domain)
const updateUserProfilebyAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // req.params.id gets id from the url

  if (user) {
    // if user exists
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save(); // method is used to save the updated user object to the database, thereby persisting the changes made to the user object.
    
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsersProfile,
  deleteUserProfile,
  getUserProfileByAdmin,
  updateUserProfilebyAdmin,
};
