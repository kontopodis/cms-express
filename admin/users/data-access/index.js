const makeDB = require("../../../modules/db")
const userMakeDB = require("./user-db")

const userDB = userMakeDB(makeDB)

module.exports = userDB
