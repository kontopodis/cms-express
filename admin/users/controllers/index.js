const makeCreateUser = require("./createUser")
const makeGetUsers = require("./getUsers")
const makeRemoveUser = require("./removeUser")
const makeUpdateUser= require("./updateUser")
const userService = require("../use-cases")


const createUser = makeCreateUser(userService.addUser)
const getUsers = makeGetUsers(userService.findAll)
const removeUser = makeRemoveUser(userService.deleteUser)
const updateUser = makeUpdateUser(userService.updateUser)
const userController = Object.freeze(
    {
        createUser,
        getUsers,
        removeUser,
        updateUser
    }
)

module.exports = userController