import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';



export const signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check If The Input Fields are Valid
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please input username, email, and password" });
      }
  
      // Check If User Exists In The Database
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        return res.status(400).json({ message: "User with this username or email already exists" });
      }
  
      // Hash The User's Password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Save The User To The Database
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      return res
        .status(201)
        .json({ message: "User created successfully", newUser });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error creating user" });
    }
  };

  export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the input fields are valid
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: 'Please Input Username and Password' });
      }
  
      // Check if the user exists in the database
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.SECRET_KEY || '1234!@#%<{*&)',
        { expiresIn: '1h' }
      );
  
      return res
        .status(200)
        .json({ message: 'Login Successful', data: user, token });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Error during login' });
    }
  };

  //get all organizers
  export const getAllOrganizer = async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await User.find({}, { password: 0 }); // Exclude the password field from the response
  
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Error fetching users' });
    }
  };