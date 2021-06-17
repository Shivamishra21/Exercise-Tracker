const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {isEmail} = require('validator')

//Schema building

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter email!"],
      unique: true,
      lowercase: true,
      validate:[isEmail,"Please enter a valid email."]
    },
    username: {
      type: String,
      required: [true, "Please enter username!"],
      unique: true,
      trim: true,
      minlength: 4,
    },
    password: {
      type: String,
      required: [true, "Please enter password."],
      minlength: [7, "Length of password should be 7."],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({
    // $or: [{ username: username }, { email: username }],
    username: username,
  });
  if (user) {
    console.log("User found")
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      console.log("User has enterred right password!")
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email/Username");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
