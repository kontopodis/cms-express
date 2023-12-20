const sqlite3 = require("sqlite3").verbose();
const {open} = require("sqlite")

const makeDB = async () => {
    return  await open({
        filename: 'cms-express.db',
        driver: sqlite3.Database
      })
    
};

module.exports = makeDB;
