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

  const isUserRole = async (role,id) =>{
    let db = await makeDB();
    let user = await db.get("select * from cmsUser where id=?", id);
    if(user.role === role){
      return true
    }else{
      return false
    }  };
  

  const addUser = async (user) => {

        let db = await makeDB();
        let sql = `INSERT INTO cmsUser
      (id,username,password,createdOn,role,email,lastLogin) 
      VALUES(:id,:username,:password,:createdOn,:role,:email,:lastLogin)`;
        let obj = {
          ":id": user.getId(),
          ":username": user.getUsername(),
          ":password": user.getPassword(),
          ":createdOn": user.getCreatedOn(),
          ":role": user.getRole(),
          ":email": user.getEmail(),
          ":lastLogin": user.getLastLogin(),
        };
        let res = await db.run(sql, obj);

        return await res;
    
 
  };
  const updateUserById = async ( user) => {
    let db = await makeDB();
    let sql = `update cmsUser set username= :username, password= :password ,role= :role, email = :email, lastLogin = :lastLogin where id= :id`  
    let obj = {
      ":id":user.getId(),
      ":username": user.getUsername(),
      ":password": user.getPassword(),
      ":role": user.getRole(),
      ":email": user.getEmail(),
      ":lastLogin": user.getLastLogin(),
    };

    let res = await db.run(sql,obj)
    return await res;
  };
  const deleteUserByEmail = async (email) => {
    let db = await makeDB();
    let sql = "delete from cmsUser where email=?";
    let res = await db.run(sql, email);
    return await res;
  };

  return Object.freeze({
    findAll,
    findById,
    findByEmail,
    addUser,
    updateUserById,
    deleteUserByEmail,
    isUserRole
  });
};

export default userMakeDB;
