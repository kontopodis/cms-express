const buildMakeUser = require("./user")
const validators = require("../validators")

const makeUser = buildMakeUser({validators})

module.exports = makeUser