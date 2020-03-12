const bcrypt = require("bcrypt")

const hash = (value) => bcrypt.hash(value, 50)

module.exports = {
    hash
}