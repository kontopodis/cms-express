const buildMakeUser = require("./user")
const validators = require("../../modules")

const makeUser = buildMakeUser({validators})

module.exports = makeUser