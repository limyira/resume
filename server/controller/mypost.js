import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Post from "../model/Post.js";

export const mypost = async (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  const decodedToken = jwt.decode(token);
  const _id = decodedToken._id;
  const user = await User.findById(_id.replace(/"/g, ""));
  if (user) {
    let returnPosts = [];
    for (let i = 0; i < user.post.length; i++) {
      const post = await Post.findById(user.post[i]._id);
      returnPosts.push(post);
    }
    return res.status(200).json({ result: returnPosts });
  } else return res.status(401).json({ err: "user does not exists" });
};
