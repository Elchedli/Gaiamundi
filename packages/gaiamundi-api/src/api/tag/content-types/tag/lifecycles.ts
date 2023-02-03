module.exports = {
  afterFindMany: async (event) => {
    const { result } = event;
    result.forEach((tag) => {
      const count = tag.page_cartos ? tag.page_cartos.length : 0;
      delete tag.page_cartos;
      tag.count = count;
    });
  },
};
