import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

const MONGO_URI = process.env.MONGO_URI;
const DB = "cookterest";
const RECIPES_COLLECTION = "recipes";

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");
const client = new MongoClient(MONGO_URI);
const db = client.db(DB);

//  @desc       Get all the recipes
//  @route      GET /api/recipes
//  @access     Public
const getRecipes = async (req, res) => {
  try {
    const recipes = await db.collection(RECIPES_COLLECTION).find().toArray();
    if (!recipes) {
      return res
        .status(400)
        .json({ status: 404, message: "Error getting users!" });
    } else if (recipes.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No recipes Found!" });
    } else {
      return res.status(200).json({ status: 200, recipes });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc       Get a recipe
//  @route      GET /api/recipes/:_id
//  @access     Public
const getRecipe = async (req, res) => {
  const { _id } = req.params;
  try {
    const recipe = await db.collection(RECIPES_COLLECTION).findOne({ _id });
    if (!recipe) {
      return res
        .status(404)
        .json({ status: 404, message: "Recipe not found!" });
    } else {
      return res.status(200).json({ status: 200, recipe });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc       Get recipes from a user
//  @route      GET /api/recipes/user/:_id
//  @access     Public
const getRecipeByUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const recipes = await db.collection(RECIPES_COLLECTION).find().toArray();

    if (!recipes) {
      return res
        .status(404)
        .json({ status: 404, message: "Recipe not found!" });
    }
    const usersRecipes = recipes.filter((recipe) =>
      recipe.userOwnerId.includes(_id)
    );
    res.status(200).json({ status: 200, usersRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  @desc       Add a recipe
//  @route      POST /api/recipes
//  @access     Private
const addRecipe = async (req, res) => {
  const {
    userOwnerId,
    title,
    subtitle,
    tags,
    ingredients,
    instructions,
    imageURL,
  } = req.body;
  const newRecipe = {
    _id: uuidv4(),
    userOwnerId,
    title,
    subtitle,
    tags,
    ingredients,
    instructions,
    imageURL,
  };
  try {
    await db.collection(RECIPES_COLLECTION).insertOne(newRecipe);
    return res.status(200).json({
      status: 200,
      message: "Recipe Successfully Added!",
      data: newRecipe,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export { getRecipes, getRecipe, getRecipeByUser, addRecipe };
