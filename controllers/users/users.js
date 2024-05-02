const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async ({ req, res }) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  }
  const isPasswordCorrect = user.validatePassword(password);
  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "12h",
    });
    await User.findByIdAndUpdate(user._id, { token });

    return res.json({
      status: "OK",
      code: 200,
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } else {
    return res.json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: "Conflict",
      code: 409,
      message: "Email in use",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
