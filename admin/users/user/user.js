

module.exports = buildMakeUser = ({modules} ) => {
  return (makeUser = ({
    id = modules.createId(),
    username,
    password,
    createdOn = new Date().toLocaleString('en-GB', {
      hour12: false,
    }),
    role = "reader",
    email,
    lastLogin = new Date().toLocaleString('en-GB', {
      hour12: false,
    }),
  }) => {
    if (!modules.isValidId(id)) {
      throw new Error("User must have a valid id.");
    }
    if (!username) {
      throw new Error("User must have a Username");
    }
    if (!password) {
      throw new Error("User must have a password");
    }
    if (!modules.isValidPassword(password)) {
      throw new Error("User Password is invalid");
    }
    if (!role) {
      throw new Error("User must have a Role");
    }
    if (!modules.isValidEmail(email)) {
      throw new Error("User must have a valid Email");
    }


    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getPassword: () => password,
      getCreatedOn: () => createdOn,
      getRole: () => role,
      getEmail: () => email,
      getLastLogin: () => lastLogin,

      changeRoleToReader: () => {
        role = "reader";
      },
      changeRoleToModerator: () => {
        role = "moderator";
      },
      changeRoleToAdmin: () => {
        role = "admin";
      },
      setUsername: (newUsername) => {
        username = newUsername;
      },
      setPassword: (newPassword) => {
        password = newPassword;
      },
      setEmail: (newEmail) => {
        email = newEmail;
      },
      setLastLogin: (newLogin) => {
        lastLogin = newLogin;
      },
      toObject:()=>{
        return {
          id,
          username,
          password,
          createdOn,
          email,
          role,
          lastLogin
        }
      }
    });
  });
};
