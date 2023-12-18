const { createId, isCuid } = require("@paralleldrive/cuid2")

const isValidId = (id) => {
  return isCuid(id);
};

const Id = Object.freeze({
  createId : ()=> createId(),
  isValid : (id)=> isValidId(id),
});

module.exports = Id;
