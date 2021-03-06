const { getDatabase } = require("../config/mongoConnect");

class User {
  static async addUser(payload) {
    try {
      let db = getDatabase();

      let collection = db.collection("users");

      const foundUser = await collection.findOne({
        email: payload.email,
      });

      if (foundUser) {
        throw new Error("User already exist");
      }

      const user = await collection.insertOne(payload);
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async findUser(payload) {
    try {
      let db = getDatabase();

      let collection = db.collection("users");

      const foundUser = await collection.findOne({
        email: payload,
      });

      return foundUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = User;
