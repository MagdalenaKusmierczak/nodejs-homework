const express = require("express");
const {
  register,
  login,
  logout,
  current,
  changeSubscription,
} = require("../../controllers/users/users");
const auth = require("../../middlewares/authenticate");

const usersRouter = express.Router();

usersRouter.post("/signup", register);

usersRouter.post("/login", login);

usersRouter.post("/logout", auth, logout);

usersRouter.get("/current", auth, current);

usersRouter.patch("/", auth, changeSubscription);

usersRouter.patch("/avatars", auth);

module.exports = usersRouter;
