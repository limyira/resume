import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  payload: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: [contentSchema],
  createdAt: { type: Date, default: Date.now() },
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
