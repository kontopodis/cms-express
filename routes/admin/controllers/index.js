const makeCreateUser = require("./createUser")
const userService = require("../use-cases")

const createUser = makeCreateUser(userService.addUser)

const userController = Object.freeze(
    {createUser}
)

module.exports = userController