const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { postUser } = require("../../schema/users.js");

require("dotenv").config();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validation = postUser.validate({ email, password });
    if (validation.error) {
      return res.json({
        status: "rejected",
        code: 404,
        message: `${validation.error.message}`,
      });
    } else {
      console.log("Data is valid");
    }

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

    return res.json({
      status: "Created",
      code: 201,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    res.json({
      code: 404,
      status: "Error",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email)
      return res.status(400).json({
        status: "ValidationError",
        code: 400,
        message: "EMAIL and PASSWORD is not allowed to be empty",
      });
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const payload = {
        id: user._id,
        username: user.username,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });
      await User.findByIdAndUpdate(user._id, token);

      return res.json({
        status: "OK",
        code: 200,
        token,
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
  } catch (error) {
    res.json({
      code: 404,
      status: "Error",
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: null });
    return res.json({
      status: "No Content",
      code: 204,
    });
  } catch (error) {
    res.json({
      code: 404,
      status: "Error",
      message: error.message,
    });
  }
};

const current = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    return res.json({
      code: 200,
      status: "OK",
      email: user.email,
      subscription: user.subscription,
    });
  } catch (err) {
    res.json({
      status: "Error",
      body: {
        message: err.message,
      },
    });
  }
};

const changeSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { id } = req.user;
  if (Object.keys(req.body).length === 0) {
    next(
      res.json({
        code: 400,
        status: "missing required",
        message: "missing required field",
      })
    );
  }
  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  if (!result) {
    return res.json({
      code: 404,
      status: "Not found",
      message: "User not found",
    });
  }

  return res.json({
    code: 200,
    status: "OK",
    subscription,
  });
};

module.exports = {
  register,
  login,
  logout,
  current,
  changeSubscription,
};
