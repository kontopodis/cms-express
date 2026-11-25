import userDB from "../data-access/index.js";
const makeFindUserByRole = () => {
  const findUserByRole = async (role) => {
    return await userDB.findByRole(role);
  };
  return findUserByRole;
};
export default makeFindUserByRole;