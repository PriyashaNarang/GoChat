import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createtokenandsavecookie from "../jwt/Generatetoken.js";
export const signup = async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;
  try {
    if (password != confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const requser = await user.findOne({ email });
    if (requser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hashing the password
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new user({
      fullname,
      email,
      password: hashedpassword,
    });
    await newuser.save();
    if (newuser) {
      createtokenandsavecookie(newuser._id, res);
      return res
        .status(201)
        .json({
          message: "User created successfully",
          newuser: {
            id: newuser._id,
            fullname: newuser.fullname,
            email: newuser.email,
          },
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error occurred" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const requser = await user.findOne({ email });
    if(!requser)
    {
      return res.status(402).json({message: "user not found"});
    }
    const ismatch = await bcrypt.compare(password, requser.password);
    if (!ismatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    createtokenandsavecookie(requser._id, res);
    return res
      .status(201)
      .json({
        message: "Logged in successfully",
        requser: {
          id: requser._id,
          fullname: requser.fullname,
          email: requser.email,
        },
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error occurred" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error occurred" });
  }
};
export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await user.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    return res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};
