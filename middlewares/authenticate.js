const jwt = require("jsonwebtoken");

const User = require("../models/User");

const SECRET_KEY = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.json({
      code: 401,
      status: "Unauthorized",
      message: "Not authorized",
    });
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return res.json({
        code: 401,
        status: "Unauthorized",
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      code: 401,
      status: "Unauthorized",
      message: "Not authorized",
    });
  }
};

module.exports = authenticate;
