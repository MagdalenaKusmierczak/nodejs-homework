const express = require("express");

const usersRouter = express.Router();

router.post("/users/signup");

router.post("/users/login");

router.post("/users/logout");

router.get("/users/current");

module.exports = usersRouter;
