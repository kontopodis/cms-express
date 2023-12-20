const userMakeDB = (makeDB) => {
  const findAll = async () => {
    let db = await makeDB();
    return await db.all("select * from cmsUser");
  };
  const findById = async (id) => {
    let db = await makeDB();
    let user = await db.get("select * from cmsUser where id=?", id);
    return await user;
  };
  const findByEmail = async (email) => {
    let db = await makeDB();
    let user = await db.get("select * from cmsUser where email=?", email);
    return await user;
  };

  const addUser = async (user) => {
    let userById = await findById(user.getId());
    let userByEmail = await findByEmail(user.getEmail());

    if (userById) {
      return "User Exists";
    } else {
      if (userByEmail) {
        return "User Exists";
      } else {
        let db = await makeDB();
        let sql = `INSERT INTO cmsUser
      (id,username,password,createdOn,role,currentStatus,email,lastLogin) 
      VALUES(:id,:username,:password,:createdOn,:role,:currentStatus,:email,:lastLogin)`;
        let obj = {
          ":id": user.getId(),
          ":username": user.getUsername(),
          ":password": user.getPassword(),
          ":createdOn": user.getCreatedOn(),
          ":role": user.getRole(),
          ":currentStatus": user.getCurrentStatus(),
          ":email": user.getEmail(),
          ":lastLogin": user.getLastLogin(),
        };
        let res = await db.run(sql, obj);

        return await res;
      }
    }
  };
  const updateUserById = async (id, user) => {
    let db = await makeDB();
    sql = `update cmsUser set username=:username, password=:password ,role= :role, currentStatus = :currentStatus, email = :email, lastLogin = :lastLogin where id=:id`  
    let obj = {
      ":id":id,
      ":username": user.getUsername(),
      ":password": user.getPassword(),
      ":role": user.getRole(),
      ":currentStatus": user.getCurrentStatus(),
      ":email": user.getEmail(),
      ":lastLogin": user.getLastLogin(),
    };

    let res = await db.run(sql,obj)
    return await res;
  };
  const deleteUserById = async (id) => {
    let db = await makeDB();
    let sql = "delete from cmsUser where id=?";
    let res = await db.run(sql, id);
    return await res;
  };

  return Object.freeze({
    findAll,
    findById,
    findByEmail,
    addUser,
    updateUserById,
    deleteUserById,
  });
};

module.exports = userMakeDB;
