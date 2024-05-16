import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/userRoutes.js";
import { recipeRouter } from "./routes/recipeRouter.js";
import { commentRouter } from "./routes/commentRouter.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
