const makeDB = require("../db")
const jwt = require("../jwt")
const insertToken = async (token, userId) => {
    
    let db = await makeDB()
    let obj = {
        ":userId":userId,
        ":token":token
    }
    let sql = "INSERT INTO cmsTokens(userId, token) VALUES(:userId, :token)"
    return await db.run(sql,obj)
}
const deleteToken = async (token) => {
    let db = await makeDB()
    let sql = "delete from cmsTokens where token=?";
    return await db.run(sql,token)
}

const getTokenId = async (token) =>{
    let db = await makeDB()
    let sql = "SELECT * FROM cmsTokens where token=?";
    return await db.run(sql,token)
}
const getIdsToken =async (userId) =>{
    let db = await makeDB()
    let sql = "SELECT * FROM cmsTokens where userId=?";
    return await db.run(sql,userId)
}

const jwtServicce = Object.freeze(
    {
        insertToken,
        deleteToken
    }
)
module.exports =jwtServicce