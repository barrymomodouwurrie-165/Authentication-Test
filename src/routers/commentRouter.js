import express from "express";
import dayjs from "dayjs";
import Comment from "../models/commentsModel.js";

const commentRouter = express.Router();

commentRouter.post("/comments", async (req, res) => {
  try {
    const { timeInMs, name, comment } = req.body;
    const time = dayjs().valueOf();
    const newComment = new Comment({ timeInMs: time, name, comment });
    const comments = await newComment.save();
    res.status(201).json({ message: "Created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal error", err });
  }
});

commentRouter.get("/comments", async (req, res) => {
  try {
    const allComments = await Comment.find();
    if (!allComments) {
      return res.status(400);
    }
    res.status(200).json(allComments);
  } catch (err) {
    res.status(500).json({ message: "Internal error", err });
  }
});

export default commentRouter;
