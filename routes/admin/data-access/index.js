const sqlite3 = require("sqlite3")
const userMakeDB = require("./user-db")
var {resolve} = require("path")

const databasePath = resolve("./routes/admin/data-access/db/cms-express.db")

const makeDB = async ()=>{
    
    const client = await new sqlite3.Database(databasePath,(arg)=>{
        console.log(arg)
        if(!arg){
            console.log("DB Exists")
        }else{ 
            createTables(client)
        }
       
    })

        function createTables(newdb) {
            console.log("creating table")
            newdb.exec(`
            create table cmsUser (
                id text primary key not null,
                username text not null,
                password text not null,
                email text not null,
                createdOn text not null,
                role text not null,
                currentStatus text not null,
                lastLogin text not null);`,(arg)=>{
                    console.log(arg)
                });
        }
    
        return client

}

module.exports = makeDB



