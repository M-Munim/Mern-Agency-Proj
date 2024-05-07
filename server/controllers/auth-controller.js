// // Controller reffers to a part of code that is responsible for handling the app's logic. (Our Mini App)

const User = require("../models/user-model")
const bcrypt = require('bcryptjs')

// ************************* Home
const home = async (req, res) => {
  try {
    res.status(200).json("Welcome Munim by auth router");
  } catch (error) {
    console.log(error);
  }
};

// ***************************** Registration logic

// 1. Get Data ( Retrieve data (username, email, password))
// 2. Check Email Existence (Check if email is already registered ? )
// 3. Hash password (Securely hash the password)
// 4. Create User (Create new user with hashed password)
// 5. Save to DB (Save user data to the db)
// 6. Respond ("Registration Successfull" , "Error") 

const register = async (req, res) => {
  try {
    const { username, email, phone, password, isAdmin } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // hashing password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound)

    // Create new user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
      isAdmin,
    });

    // Send back the newly created user data as response
    res.status(201).json({
      msg: "userCreated",
      token: await userCreated.generateToken(),
      // Converting id to string is a good practice coz it ensures consistency and compatibility accross different JWT libraries.
      userId: userCreated._id.toString()
    });
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ msg: "Internal server error" });
    next(error)
  }
};

// ***************** Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // email is VALID ?
    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password)

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      })
    } else {
      res.status(401).json({ message: "Invalid Credentials" })
    }
  } catch (error) {
    res.status(500).json("Internal server ERROR")
  }
}


module.exports = { home, register, login }