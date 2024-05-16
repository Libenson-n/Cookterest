import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { token } from "morgan";

const MONGO_URI = process.env.MONGO_URI;
const DB = "cookterest";
const USERS_COLLECTION = "users";

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");
const client = new MongoClient(MONGO_URI);
const db = client.db(DB);

//  @desc      Auth user/set token
//  @route     POST /api/users/auth
//  @access    Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.collection(USERS_COLLECTION).findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Email or password is not valid" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (isPasswordValid) {
      generateToken(res, user._id);
      return res.status(200).json({
        status: 200,
        user,
      });
    } else {
      return res
        .status(401)
        .json({ status: 401, message: "Email or password is not valid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc     Register a new user
//  @route    POST /api/users
//  @access   Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const foundUser = await db.collection(USERS_COLLECTION).findOne({ email });
    if (foundUser) {
      res.status(400).json({
        status: 400,
        message: `Email already registered!`,
      });
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = {
        _id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        bio: "",
        favorites: [],
        profilePic: "",
      };
      await db.collection(USERS_COLLECTION).insertOne(user);
      generateToken(res, user._id);
      return res.status(200).json({
        status: 200,
        message: "User registration successfull!",
        user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc     Logout user
//  @route    POST /api/users/logout
//  @access   Private
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ status: 200, message: "User logged out" });
};

//  @desc     Get user profile
//  @route    GET /api/users/profile
//  @access   Private
const getUserProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.collection(USERS_COLLECTION).findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: `User not found!`,
      });
    } else {
      return res.status(200).json({ status: 200, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc     Update user profile
//  @route    PATCH /api/users/profile
//  @access   Private
const updateUserProfile = async (req, res) => {
  const { _id } = req.body;
  const query = { _id };
  const newValues = { $set: { ...req.body } };
  try {
    const user = await db.collection(USERS_COLLECTION).findOne({ _id });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "Error user not found!" });
    } else {
      await db.collection(USERS_COLLECTION).updateOne(query, newValues);
      return res.status(200).json({
        status: 200,
        message: "User successfully updated!",
        newValues,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// @desc      Delete a user profile
// @route     DELETE /api/users/profile
// @access    Public
const deleteUserProfile = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await db.collection(USERS_COLLECTION).deleteOne({ _id });
    if (user.deletedCount === 1) {
      return res
        .status(200)
        .json({ status: 200, message: "User successfulley deleted!" });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Error user not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// @desc      Get a single user
// @route     GET /api/users/:_id
// @access    Public
const getUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await db.collection(USERS_COLLECTION).findOne({ _id });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: `User not found!`,
      });
    } else {
      return res.status(200).json({ status: 200, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// @desc      Get all the users
// @route     GET /api/users
// @access    Public
const getUsers = async (req, res) => {
  try {
    const users = await db.collection(USERS_COLLECTION).find().toArray();
    if (!users) {
      return res
        .status(400)
        .json({ status: 400, message: "Error getting users!" });
    } else if (users.length === 0) {
      return res.status(404).json({ status: 404, message: "No users Found!" });
    } else {
      return res.status(200).json({ status: 200, users });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateFavorites = async (req, res) => {
  const { _id } = req.params;
  const { recipeId } = req.body;
  const query = { _id };

  try {
    const foundUser = await db.collection(USERS_COLLECTION).findOne({ _id });

    if (!foundUser) {
      return res.status(404).json({ status: 404, message: "User Not Found!" });
    }
    if (foundUser.favorites.includes(recipeId)) {
      await db
        .collection(USERS_COLLECTION)
        .updateOne(query, { $pull: { favorites: recipeId } });
      return res
        .status(200)
        .json({ status: 200, message: "Favorites Successfully Updated!" });
    } else {
      await db
        .collection(USERS_COLLECTION)
        .updateOne(query, { $push: { favorites: recipeId } });
      return res
        .status(200)
        .json({ status: 200, message: "Favorites Successfully Updated!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getFavorites = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await db.collection(USERS_COLLECTION).findOne({ _id });
    const favorites = await result.favorites;
    if (favorites.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No Favorites Found!" });
    } else {
      return res.status(200).json({ status: 200, favorites });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUser,
  getUsers,
  updateFavorites,
  getFavorites,
};
