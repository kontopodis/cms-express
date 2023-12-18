const log = require("../../../tools/log");

module.exports = buildMakeUser = ({ Id, Pass }) => {
  console.log("buildMakeUser");
  return (makeUser = ({
    id = Id.createId(),
    username,
    password,
    createdOn = Date.now(),
    role,
    currentStatus,
    email,
    lastLogin = Date.now(),
  }) => {

    if (!Id.isValid(id)) {
      throw new Error("User must have a valid id.");
    }
    if (!username) {
      throw new Error("User must have a Username");
    }
    if (!password) {
      throw new Error("User must have a password");
    }
    if (!Pass.isValid(password)) {
      throw new Error("User Password is invalid");
    }
    if (!role) {
      throw new Error("User must have a Role");
    }
    if (!email) {
      throw new Error("User must have an Email");
    }

    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getPassword: () => password,
      getCreatedOn: () => createdOn,
      getRole: () => role,
      getCurrentStatus: () => currentStatus,
      getEmail: () => email,
      getLastLogion: () => lastLogin,

      changeRoleToReader: () => {
        role = "reader";
      },
      changeRoleToModerator: () => {
        role = "moderator";
      },
      changeRoleToAdmin: () => {
        role = "admin";
      },
    });
  });
};
