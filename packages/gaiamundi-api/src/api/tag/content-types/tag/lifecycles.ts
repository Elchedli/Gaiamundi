module.exports = {
  afterFindMany: async (event) => {
    const { result } = event;
    result.forEach((x) => {
      const count = x.page_cartos.length;
      delete x.page_cartos;
      x.totalTags = count;
    });
  },
};
