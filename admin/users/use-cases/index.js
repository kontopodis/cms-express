const makeAddUser = require("./add-user")
const makeFindAll = require("./find-all")
const makeFindUserById = require("./find-user-by-id")
const makeFindUserByEmail = require("./find-user-by-email")
const makeDeleteUser = require("./delete-user")
const makeUpdateUser = require("./update-user")
const userDB = require("../data-access/index")


const addUser = makeAddUser(userDB)
const findAll = makeFindAll(userDB)
const findById = makeFindUserById(userDB)
const findByEmail = makeFindUserByEmail(userDB)
const deleteUser = makeDeleteUser(userDB)
const updateUser = makeUpdateUser(userDB)

const userService = Object.freeze({
    addUser,
    findAll,
    findById,
    findByEmail,
    deleteUser,
    updateUser
})

module.exports = userService
