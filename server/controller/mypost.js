import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Posts from "../model/Posts.js";

export const mypost = async (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  const decodedToken = jwt.decode(token);
  console.log(decodedToken);
  const _id = decodedToken._id;
  console.log(_id);
  const user = await User.findById(_id);
  if (user) {
    let returnPosts = [];
    for (let i = 0; i < user.post.length; i++) {
      const post = await Posts.findById(user.post[i]._id);
      returnPosts.push(post);
    }
    return res.status(200).json({ result: returnPosts });
  } else return res.status(401).json({ err: "user does not exists" });
};
