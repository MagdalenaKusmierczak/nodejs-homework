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

router.post("/signup", register);

router.post("/login", login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

router.patch("/", authenticate, changeSubscription);

module.exports = usersRouter;
