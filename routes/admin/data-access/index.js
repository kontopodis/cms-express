const sqlite3 = require("sqlite3").verbose();
const {open} = require("sqlite")
const userMakeDB = require("./user-db")
const makeDB = async () => {
    return  await open({
        filename: 'cms-express.db',
        driver: sqlite3.Database
      })
    
};

const userDB = userMakeDB(makeDB)

module.exports = userDB
