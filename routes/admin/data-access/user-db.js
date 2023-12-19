const userMakeDB = (makeDB) => {
  const findAll = () => {
    let db = makeDB();
    let result = db.get("SELECT * FROM cmsUser");
    db.close();
    return JSON.stringify(result);
  };
  const findById = (id) => {
    let result;
    makeDB().then((db) => {
      let sql = `SELECT * FROM cmsUser where id="${id}"`;

      db.all(sql, (rows) => {
        result = rows;
      });

      sqlT = "select cmsUser from sqlite_master where type='table'";
      db.all(sqlT, (t) => {
    console.log(t)
      });
    });

    return JSON.stringify(result);
  };

  const addUser = (user) => {
    let response;
    makeDB().then((db) => {
      let userExists = findById(user.getId());
      let row = JSON.stringify(userExists);
      let sql = `INSERT INTO cmsUser (id,username,password,createdOn,role,currentStatus,email,lastLogin) VALUES("${user.getId()}","${user.getUsername()}","${user.getPassword()}","${user.getCreatedOn()}","${user.getRole()}","${user.getCurrentStatus()}","${user.getEmail()}","${user.getLastLogin()}");`;
      db.run(sql, (err) => {
        response = err;
      });
      if (!response) {
        response = "Insert successful";
      }
    });

    return response;
  };
  const updateUser = (id, userUpdate) => {};
  const deleteUser = (id) => {
    let db = makeDB();

    let response = db.run(`DELETE FROM cmsUser WHERE id="${id}"`);
    if (!response) {
      response = "Delete successful";
    }

    return response;
  };

  return Object.freeze({
    findAll,
    findById,
    addUser,
    updateUser,
    deleteUser,
  });
};

module.exports = userMakeDB;
