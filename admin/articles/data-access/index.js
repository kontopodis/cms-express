import makeDB from "../../../modules/db.js"
import makeArticleDB from "./articleDb.js"
const articleDB = makeArticleDB(makeDB)
export default articleDB