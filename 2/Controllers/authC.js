const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/userM");

//register login and check authority using jwt





const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "please fill all details" });
  }
  if(password.length<6){
    return res.status(400).json({ error: "Password must be atleast 6 character long" });
  }
  // Check if User exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: "user already exists" });
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({ username, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ error: "invalid user data" });
  }
};





const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try{
  if (!username || !password) {
    return res.status(400).json({ error: "please fill all details" });
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.role === "admin") {
      return res.status(400).json({ error: "wrong login route" });
    } 
    else {
      res.json({
        _id: user.id,
        username: user.username,
        token: generateToken(user._id),
      });
    }
  } 
  else {
    return res.status(400).json({ error: `Invalid credentials`});
  }}catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: "Server Error" });
  }
};





const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!username || !password) {
    return res.status(400).json({ error: "please fill all details" });
  }
  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    user.role === "admin"
  ) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};




const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};





module.exports = { register, login, adminLogin };




