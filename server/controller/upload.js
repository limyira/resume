import Posts from "../model/Posts.js";
import User from "../model/User.js";

export const postUpload = async (req, res) => {
  const { _id, content, companyName } = req.body;
  console.log(_id);
  try {
    const post = await Posts.create({
      name: companyName,
      content,
    });
    const user = await User.findById(_id.replace(/"/g, ""));
    if (user) {
      console.log(post._id.toString());
      user.post.push(post._id);
      await user.save();
    }
    return res.status(200).json({ sucess: "success" });
  } catch (err) {
    return res.status(400).json({ err });
  }
};
