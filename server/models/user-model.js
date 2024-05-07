// SCHEMA: Defines the structure of the docs within a collection. It Specfies the fileds, their types, and any additional constraints or validations.

// MODEL: Acts as a higher-lvl abstraction that interacts with the database based on the defined schema. It represents collection and provides an interface for CURD documents in that collection.

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: false,
  },
});

// secure the password with bcrypt, act as middleware date save krny sy pehly ya function run hoga

userSchema.pre('save', async function (next) {
  // console.log("pre method", this);
  const user = this;

  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound)
    user.password = hash_password;
  } catch (error) {
    next(error)
  }
});


// compare the password

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Json Web Token
// Instance Method
// user schema.methods ki madad sy hum kafi methods/ functions create kr skty hen 
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
}

// Defining the model or the collection name 
const User = new mongoose.model("User", userSchema);
module.exports = User;