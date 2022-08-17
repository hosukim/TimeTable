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

export const degrees = () => {
  let valueX = 90;
  let valueY = 75;
  return Array(24)
    .fill()
    .map(function (_, index) {
      if (index === 6) {
        valueY = -350;
      } else if (index === 7) {
        valueX = -350;
        valueY += 15;
      } else if (index > 8) {
        valueX += 15;
        valueY += 15;
      }
      return {
        min: valueX > 0 ? valueX - index * 15 : valueX,
        max: valueY > 0 ? valueY - index * 15 : valueY,
      };
    });
};
