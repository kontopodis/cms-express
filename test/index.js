
const checkersTests = require("../admin/users/validators/validators.test.js")
const userTests = require("../admin/users/user/user.test.js")
const dataTests = require("../admin/users/data-access/data.test.js")
const jwtTests = require("../modules/jwt/jwt.test.js")
checkersTests()
userTests()
dataTests()
jwtTests()
