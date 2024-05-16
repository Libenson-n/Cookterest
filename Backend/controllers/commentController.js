import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

const MONGO_URI = process.env.MONGO_URI;
const DB = "cookterest";
const COMMENTS_COLLECTION = "comments";

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");
const client = new MongoClient(MONGO_URI);
const db = client.db(DB);

//  @desc       Add a comment
//  @route      POST /api/comments
//  @access     Private
const addComment = async (req, res) => {
  const { userName, userId, comment, recipeName, recipeId, timestamp } =
    req.body;
  const newComment = {
    _id: uuidv4(),
    userName,
    userId,
    recipeName,
    recipeId,
    comment,
    timestamp,
  };
  console.log(userId);
  try {
    await db.collection(COMMENTS_COLLECTION).insertOne(newComment);
    return res.status(200).json({
      status: 200,
      message: "Comment Successfully Added!",
      data: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc       Get all the comments
//  @route      GET /api/comments
//  @access     Public
const getComments = async (req, res) => {
  try {
    const comments = await db.collection(COMMENTS_COLLECTION).find().toArray();
    if (!comments) {
      return res
        .status(400)
        .json({ status: 404, message: "Error getting comments!" });
    } else if (comments.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No comments Found!" });
    } else {
      return res.status(200).json({ status: 200, comments });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc       Get comments based on the user id
//  @route      GET /api/comments/user/:_id
//  @access     Public
const getCommentsByUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const comments = await db.collection(COMMENTS_COLLECTION).find().toArray();
    if (!comments) {
      return res
        .status(404)
        .json({ status: 404, message: "Comments Not Found!" });
    } else {
      const commentsByUser = comments.filter(
        (comment) => comment.userId === _id
      );
      return res.status(200).json({ status: 200, commentsByUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc       Get comments based on the recipe id
//  @route      GET /api/comments/recipe/:_id
//  @access     Public
const getCommentsByRecipe = async (req, res) => {
  const { _id } = req.params;
  try {
    const comments = await db.collection(COMMENTS_COLLECTION).find().toArray();
    if (!comments) {
      return res
        .status(404)
        .json({ status: 404, message: "Comments Not Found!" });
    } else {
      const commentsByRecipe = comments.filter(
        (comment) => comment.recipeId === _id
      );
      return res.status(200).json({ status: 200, commentsByRecipe });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc       Delete a comment
//  @route      DELETE /api/comments
//  @access     Private
const deleteComment = async (req, res) => {
  const { _id } = req.body;
  try {
    const comment = await db.collection(COMMENTS_COLLECTION).deleteOne({ _id });
    if (comment.deletedCount === 1) {
      return res
        .status(200)
        .json({ status: 200, message: "Comment successfully deleted!" });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Error comment not found!" });
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
  addComment,
  getComments,
  getCommentsByUser,
  getCommentsByRecipe,
  deleteComment,
};
