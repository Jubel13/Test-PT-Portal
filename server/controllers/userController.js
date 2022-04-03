const User = require("../models/user");
const { hash } = require("../helpers/bcrypt");

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
}

module.exports = UserController;
