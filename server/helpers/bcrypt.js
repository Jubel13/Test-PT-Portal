const bcrypt = require("bcryptjs");

function hash(payload) {
  let salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(payload, salt);
}

function compare(payload, hash) {
  return bcrypt.compareSync(payload, hash);
}

module.exports = { hash, compare };
