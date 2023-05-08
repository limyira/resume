import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: false, unique: true },
  email: { type: String, required: false, unique: true },
  access_token: { type: String },
  refresh_token: { type: String },
});

// userSchema.statics.findByToken = function (token, cb) {
//   let user = this;
//   jwt.verify(token, process.env.ACCESS_SCRET, function (err, decoded) {
//     user.findOne({ _id: decoded, token: token }, (err, user) => {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

const User = mongoose.model("User", userSchema);

export default User;
