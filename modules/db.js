import sqlite3 from "sqlite3";
import {open} from "sqlite"

const makeDB = async () => {
    return  await open({
        filename: 'cms-express.db',
        driver: sqlite3.Database
      })
    
};

export default makeDB