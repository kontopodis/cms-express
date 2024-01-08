import makeAddUser from "./add-user.js"
import makeFindAll from "./find-all.js"
import makeFindUserById from "./find-user-by-id.js"
import makeFindUserByEmail from "./find-user-by-email.js"
import makeDeleteUser from "./delete-user.js"
import makeUpdateUser from "./update-user.js"
import userDB from "../data-access/index.js"


const addUser = makeAddUser({userDB})
const findAll = makeFindAll({userDB})
const findById = makeFindUserById({userDB})
const findByEmail = makeFindUserByEmail({userDB})
const deleteUser = makeDeleteUser({userDB})
const updateUser = makeUpdateUser({userDB})

const userService = Object.freeze({
    addUser,
    findAll,
    findById,
    findByEmail,
    deleteUser,
    updateUser
})


export{
   addUser,
    findAll,
    findById,
    findByEmail,
    deleteUser,
    updateUser
}
export default userService
