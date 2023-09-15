const jwt = require("jsonwebtoken");
const User = require("../models/user");


async function signup(req, res) {
  //Get the email pass
  const { email, password } = req.body;

  await User.create({ email, password });

  res.sendStatus(200);
}

async function login(req, res) {

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.sendStatus(401);

    if (password !== user.password) return res.sendStatus(401);

    //create token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    //set cookie

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production",
    })
    res.sendStatus(200);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
module.exports = {
  signup,
  login,
  logout,
  checkAuth
}; 