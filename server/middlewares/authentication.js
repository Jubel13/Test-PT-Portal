const { decodeToken } = require("../helpers/jwt");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const data = decodeToken(access_token);
    console.log(data);

    const foundUser = await User.findUser(data.email);

    if (!foundUser) {
      throw {
        code: 401,
        name: "INVALID_TOKEN",
        message: "Invalid token or user",
      };
    }

    req.loginUser = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
