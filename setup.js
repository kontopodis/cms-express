import sqlite3 from "sqlite3"


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
    client.run(`CREATE TABLE cmsArticle (id TEXT PRIMARY KEY NOT NULL, authorId text not null, title text not null, content text not null, imageUrl text not null, createdOn text not null, lastEditedOn text not null);`,
    (err) => {
      if(err){
          throw new Error(err)
      }
    }
  );
    console.log("Install of cms-express completed!")
  }

