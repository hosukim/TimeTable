export const datas = (arr) => {
  return Array(24)
    .fill()
    .map((_, index) => ({
      key: index + 1,
      value: 1,
      svg: {
        fill: arr.find((item) => item === index + 1) ? "#000000" : "#efefef",
      },
    }));
};
