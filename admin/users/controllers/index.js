import makeCreateUser from "./createUser.js"
import makeGetUsers from "./getUsers.js"
import makeRemoveUser from "./removeUser.js"
import makeUpdateUser from "./updateUser.js"


const createUser = makeCreateUser()
const getUsers = makeGetUsers()
const removeUser = makeRemoveUser()
const updateUser = makeUpdateUser()
var userController = Object.freeze(
    {
        createUser,
        getUsers,
        removeUser,
        updateUser
    }
)


export {
    createUser,
    getUsers,
    removeUser,
    updateUser
}
export default userController