const bcrypt = require("bcrypt")

const hash = (value) => bcrypt.hash(value, 10)

const compare = bcrypt.compare

module.exports = {
    hash,
    compare
}