const makeCreateUser = require("./createUser")
const makeGetUsers = require("./getUsers")
const makeGetUserById = require("./getUserById")
const makeRemoveUser = require("./removeUser")
const makeUpdateUser= require("./updateUser")
const userService = require("../use-cases")


const createUser = makeCreateUser(userService.addUser)
const getUsers = makeGetUsers(userService.findAll)
const getUserById = makeGetUserById(userService.findById)
const removeUser = makeRemoveUser(userService.deleteUser)
const updateUser = makeUpdateUser(userService.updateUser)
const userController = Object.freeze(
    {
        createUser,
        getUsers,
        getUserById,
        removeUser,
        updateUser
    }
)

module.exports = userController