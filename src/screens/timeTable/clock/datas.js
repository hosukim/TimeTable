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

export const translateDatas = () => {
  return Array(24)
    .fill()
    .map(function (_, index) {
      switch (index) {
        case 1:
          return { x: 15, y: 10 };
        case 3:
          return { x: 7, y: 15 };
        case 5:
          return { x: -5, y: 15 };
        case 7:
          return { x: -13, y: 10 };
        case 9:
          return { x: -18, y: 3 };
        case 11:
          return { x: -20, y: -10 };
        case 13:
          return { x: -16, y: -16 };
        case 15:
          return { x: -8, y: -22 };
        case 17:
          return { x: 3, y: -25 };
        case 19:
          return { x: 10, y: -20 };
        case 21:
          return { x: 20, y: -13 };
        case 23:
          return { x: 20, y: 0 };
        default:
          return { x: 0, y: 0 };
      }
    });
};
