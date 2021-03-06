require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { connectMongo } = require("./config/mongoConnect");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandlers");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

connectMongo()
  .then(() => {
    app.listen(port, () => {
      console.log("Server runs on port", port);
    });
  })
  .catch((err) => console.log(err));
