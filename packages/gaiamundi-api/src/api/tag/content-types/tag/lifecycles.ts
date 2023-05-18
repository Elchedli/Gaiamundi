module.exports = {
  afterFindMany: async ({ result, params }) => {
    const userid = params.where.page_cartos.owner.id.$eq;
    result.forEach((tag) => {
      const count = tag.page_cartos
        ? tag.page_cartos.filter((pageCarto) => pageCarto.owner.id == userid)
            .length
        : 0;
      delete tag.page_cartos;
      tag.count = count;
    });
  },
};
