const buildMakeArticle = ({ modules }) => {
  const makeArticle = ({
    id = modules.createId(),
    authorId,
    title,
    content,
    imageUrl,
    createdOn = new Date().toLocaleString("en-GB", {
      hour12: false,
    }),
    lastEditedOn = new Date().toLocaleString("en-GB", {
      hour12: false,
    }),
  }) => {
    if (!id) {
      throw new Error("Article must have an Id");
    }
    if (!modules.isValidId(id)) {
      throw new Error("The id is invalid");
    }
    if (!authorId) {
      throw new Error("Article must have an authorId");
    }
    if (!content) {
      throw new Error("Article must have content");
    }
    if (!title) {
      throw new Error("Article must have a title");
    }
    if (!imageUrl) {
      throw new Error("Article must have an image url");
    }

    return Object.freeze({
      getId: () => id,
      getAuthorsId: () => authorId,
      getContent: () => content,
      getTitle: () => title,
      getCreatedOn: () => createdOn,
      getLastEditedOn: () => lastEditedOn,
      getImageUrl: () => imageUrl,
      setTitle: (value) => {
        title = value;
      },
      setContent: (value) => {
        content = value;
      },
      setImageUrl: (value) => {
        imageUrl = value;
      },
      setLastEditedOn: () => {
        lastEditedOn = new Date().toLocaleString("en-GB", {
          hour12: false,
        });
      },
      toObject: () => {
        return {
          id,
          authorId,
          title,
          content,
          imageUrl,
          createdOn,
          lastEditedOn,
        };
      },
    });
  };
  return makeArticle;
};

export default buildMakeArticle;
