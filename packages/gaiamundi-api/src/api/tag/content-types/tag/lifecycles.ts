module.exports = {
  afterFindMany: async (event) => {
    const { result } = event;
    console.log("result is : ", result);
    result.forEach((x) => {
      const count = x.page_cartos.length;
      console.log(count);
      delete x.page_cartos;
      x.totalTags = count;
    });
  },
};
