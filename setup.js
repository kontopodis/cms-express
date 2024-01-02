const sqlite3 = require("sqlite3");
const makeUser = require("./admin/users/user")
const validators = require("./admin/users/validators")
const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new sqlite3.Database("cms-express.db", () => {
    checkDBStatus();
  });

  const checkDBStatus = () => {
    //if true db exists, else needs to install tables
    client.all(
      `select * from sqlite_master where type='table'`,
      [],
      (err, rows) => {
       
        if (err) {
          throw new Error(err)
        } else {
          if (rows.length == 0) {
            createTables();
          }
        }
      }
    );
  };
  function createTables() {
    console.log("creating table");
    client.run(`CREATE TABLE cmsUser (id TEXT PRIMARY KEY NOT NULL, username text not null, password text not null, email text not null, createdOn text not null, role text not null, lastLogin text not null);`,
      (err) => {
        if(err){
            throw new Error(err)
        }
      }
    );
    console.log("Install of cms-express completed!")
  }

