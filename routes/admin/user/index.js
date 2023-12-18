const buildMakeUser = require("./user")
const Id = require("../validators/id")
const Pass = require("../validators/password")

const makeUser = buildMakeUser({Id,Pass})