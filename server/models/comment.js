const { getDatabase } = require("../config/mongoConnect");
const { ObjectId } = require("mongodb");

class Comment {
  static async addComment(payload) {
    try {
      let db = getDatabase();

      let commentCollection = db.collection("comments");

      let commentData = {
        comment: payload.comment,
        tags: payload.tags,
      };

      const commentResult = await commentCollection.insertOne(commentData);

      // console.log(commentResult.insertedId, "ini comment");

      let collection = db.collection("users");

      const query = { email: payload.email };

      const updateDocument = {
        $push: {
          commentsId: { id: commentResult.insertedId },
        },
      };

      const result = await collection.updateOne(query, updateDocument);

      return result;
    } catch (err) {
      throw err;
    }
  }

  static async findComment(payload) {
    try {
      const userEmail = payload.email;
      let db = getDatabase();
      let userCollection = db.collection("users");

      const foundUser = await userCollection.findOne({ email: payload.email });

      console.log(foundUser);

    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = Comment;
