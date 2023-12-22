const makeCreateUser = require("./createUser")
const makeGetUsers = require("./getUsers")
const userService = require("../use-cases")

const createUser = makeCreateUser(userService.addUser)
const getUsers = makeGetUsers(userService.findAll)
const userController = Object.freeze(
    {
        createUser,
        getUsers
    }
)

module.exports = userController