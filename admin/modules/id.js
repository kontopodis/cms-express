import { createId, isCuid } from "@paralleldrive/cuid2"

const isValidId = (id) => {
  return isCuid(id);
};

const Id = Object.freeze({
  createId : ()=> createId(),
  isValid : (id)=> isValidId(id),
});
export default Id;
