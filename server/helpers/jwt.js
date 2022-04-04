const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

function decodeToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { signToken, decodeToken };
