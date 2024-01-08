import makeDB from "../../../modules/db.js"
import userMakeDB from "./user-db.js"

const userDB = userMakeDB(makeDB)

export default userDB
