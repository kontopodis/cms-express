const sqlite3 = require("sqlite3")
const userMakeDB = require("./user-db")
var {resolve} = require("path")

const databasePath = resolve("./routes/admin/data-access/db/cms-express.db")

const makeDB = ()=>{
    
    const client = new sqlite3.Database(databasePath,sqlite3.OPEN_READWRITE,(err)=>{
        if(err && err.code == "SQLITE_CANTOPEN"){
            createDatabase();
            return;
        } else if (err) {
            console.log("Getting error " + err);
            
    }
        })


        const createDatabase = () => {
            console.log("creating database")
            var newdb = new sqlite3.Database(databasePath, (err) => {
                if (err) {
                    console.log("Getting error " + err);
                    
                }
                createTables(newdb);
            });
        }
    
        function createTables(newdb) {
            console.log("creating table")
            newdb.exec(`
            create table user (
                id text primary key not null,
                username text not null,
                password text not null,
                email text not null,
                createdOn text not null,
                role text not null,
                currentStatus text not null,
                lastLogin text not null);`);
        }
    
        return client

}

module.exports = makeDB



