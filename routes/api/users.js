const express = require("express");
const {
  register,
  login,
  logout,
  current,
  changeSubscription,
} = require("../../controllers/users/users");
const authenticate = require("../../middlewares/authenticate");

const usersRouter = express.Router();

usersRouter.post("/signup", register);

usersRouter.post("/login", login);

usersRouter.post("/logout", authenticate, logout);

usersRouter.get("/current", authenticate, current);

usersRouter.patch("/", authenticate, changeSubscription);

module.exports = usersRouter;
