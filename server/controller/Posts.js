import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Posts from "../model/Posts.js";

export const getPosts = async (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  const decodedToken = jwt.decode(token);
  const _id = decodedToken._id;
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

export const postUpload = async (req, res) => {
  const { _id, content, companyName } = req.body;
  try {
    const post = await Posts.create({
      name: companyName,
      content,
    });
    const user = await User.findById(_id.replace(/"/g, ""));
    if (user) {
      user.post.push(post._id);
      await user.save();
    }
    return res.status(200).json({ sucess: "success" });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id)
      return res
        .status(404)
        .json({ err: "해당 자기소개서를 찾을 수 없습니다." });
    const post = await Posts.findById(id);
    if (!post)
      return res
        .status(404)
        .json({ err: "해당 자기소개서를 찾을 수 없습니다." });
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
export const editPost = async (req, res) => {
  const id = req.params.id; // 수정할 게시물의 ID
  const { companyName, content } = req.body;
  try {
    if (!id) return res.status(404).json({ err: "id가 존재하지 않습니다." });
    const post = await Posts.findByIdAndUpdate(id, {
      name: companyName,
      content,
    });
    // 성공적으로 수정된 게시물 반환
    return res.status(200).json({ success: true, post });
  } catch (err) {
    console.log(err);
    // 에러 처리
    return res.status(500).json({ error: "서버 에러" });
  }
};
