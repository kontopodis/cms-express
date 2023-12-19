const userMakeDB = (makeDB)=>{
    const findAll = () =>{
        let db = makeDB()
        let result = db.get("SELECT * FROM user")
        db.close()
        return JSON.stringify(result)
    }
    const findById = (id) =>{
        let db = makeDB()
        let sql = `SELECT * FROM user where id="${id}"`
        let result = db.get(sql)
        db.close()
        return JSON.stringify(result)
    }

    const addUser = (user) =>{
        let db = makeDB()
        let userExists = findById(user.getId())
        let row = JSON.stringify(userExists)
        console.log(row)

        let sql = `INSERT INTO user (id,username,password,createdOn,role,currentStatus,email,lastLogin) VALUES("${user.getId()}","${user.getUsername()}","${user.getPassword()}","${user.getCreatedOn()}","${user.getRole()}","${user.getCurrentStatus()}","${user.getEmail()}","${user.getLastLogin()}");` 
        
        let response 
        db.run(sql,(err)=>{
            response = err
        })
        if(!response){
            response = "Insert successful"
        }
        console.log(response)
     db.close()
    return response;
    }
    const updateUser = (id,userUpdate) =>{}
    const deleteUser = (id) =>{
        let db = makeDB()


        let response = db.run(`DELETE FROM user WHERE id="${id}"`)
        if(!response){
            response = "Delete successful"
        }

        db.close()
        return response
    }

return Object.freeze({
    findAll,
    findById,
    addUser,
    updateUser,
    deleteUser
})

}

module.exports = userMakeDB