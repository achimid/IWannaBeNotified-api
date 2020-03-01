const bcrypt = require("bcrypt")

const hash = (value) => bcrypt.hash(value, process.env.HASH_SALT_KEY)

module.exports = {
    hash
}