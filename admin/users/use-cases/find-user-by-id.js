import userDB from "../data-access/index.js";
const makeFindUserById = () => {
  const findUserById = async (id) => {
    return await userDB.findById(id);
  };
  return findUserById;
};
export default makeFindUserById;
