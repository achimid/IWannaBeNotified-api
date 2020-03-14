const bcrypt = require("bcrypt")

const hash = (value) => bcrypt.hash(value, 10)

module.exports = {
    hash
}