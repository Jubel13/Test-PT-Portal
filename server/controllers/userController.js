const User = require("../models/user");
const { hash, compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async addUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (!username || !email || !password || !phoneNumber || !address) {
        throw new Error("All fields are required");
      }

      let hashedPass = hash(password);
      let payload = {
        username,
        email,
        password: hashedPass,
        phoneNumber,
        address,
        comments: [],
      };

      const user = await User.addUser(payload);
      console.log(user);
      res.status(201).json({ message: "User created" });
    } catch (err) {
      console.log(err);
      if (err.message) {
        res.status(400).json(err.message);
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw {
          code: 400,
          name: "UNAUTHORIZED",
          message: "Invalid email or password",
        };
      }

      const foundUser = await User.findUser(email);

      if (!foundUser) {
        throw {
          code: 403,
          name: "UNAUTHORIZED",
          message: "Invalid email or password",
        };
      }

      let isPass = compare(password, foundUser.password);

      if (!isPass) {
        throw {
          code: 403,
          name: "UNAUTHORIZED",
          message: "Invalid email or password",
        };
      }

      const payload = {
        email: foundUser.email,
        username: foundUser.username,
      };

      let access_token = signToken(payload);

      res.status(200).json({ access_token: access_token });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
