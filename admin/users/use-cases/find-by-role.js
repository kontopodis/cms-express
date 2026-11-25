import userDB from "../data-access/index.js";
const makeFindUserByRole = () => {
  const findUserByRole = async (id) => {
    return await userDB.findByRole(id);
  };
  return findUserByRole;
};
export default makeFindUserByRole;