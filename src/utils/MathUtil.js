export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const getCoordinate = (radius, angle) => {
  const positionX = Math.cos(toRadians(angle)) * radius;
  const positionY = Math.sin(toRadians(angle)) * radius;
  return { x: positionX, y: positionY };
};

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export const calcAngleDegrees = (x, y) => {
  let theta_x = (Math.atan2(y, x) * 180) / Math.PI;
  if (theta_x < 0) {
    return theta_x + 360;
  }
  return theta_x;
};

const RADIUS = 135;
export const QUADRANT = {
  one: [
    (function () {
      const { x, y } = getCoordinate(RADIUS, 15);
      return { degree: calcAngleDegrees(x, y), value: 6 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 30);
      return { degree: calcAngleDegrees(x, y), value: 5 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 45);
      return { degree: calcAngleDegrees(x, y), value: 4 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 60);
      return { degree: calcAngleDegrees(x, y), value: 3 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 75);
      return { degree: calcAngleDegrees(x, y), value: 2 };
    })(),
  ],
  two: [
    (function () {
      const { x, y } = getCoordinate(RADIUS, 105);
      return { degree: calcAngleDegrees(x, y), value: 24 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 120);
      return { degree: calcAngleDegrees(x, y), value: 23 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 135);
      return { degree: calcAngleDegrees(x, y), value: 22 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 150);
      return { degree: calcAngleDegrees(x, y), value: 21 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 165);
      return { degree: calcAngleDegrees(x, y), value: 20 };
    })(),
  ],
  three: [
    (function () {
      const { x, y } = getCoordinate(RADIUS, 195);
      return { degree: calcAngleDegrees(x, y), value: 18 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 210);
      return { degree: calcAngleDegrees(x, y), value: 17 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 225);
      return { degree: calcAngleDegrees(x, y), value: 16 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 240);
      return { degree: calcAngleDegrees(x, y), value: 15 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 255);
      return { degree: calcAngleDegrees(x, y), value: 14 };
    })(),
  ],
  four: [
    (function () {
      const { x, y } = getCoordinate(RADIUS, 285);
      return { degree: calcAngleDegrees(x, y), value: 12 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 300);
      return { degree: calcAngleDegrees(x, y), value: 11 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 315);
      return { degree: calcAngleDegrees(x, y), value: 10 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 330);
      return { degree: calcAngleDegrees(x, y), value: 9 };
    })(),
    (function () {
      const { x, y } = getCoordinate(RADIUS, 345);
      return { degree: calcAngleDegrees(x, y), value: 8 };
    })(),
  ],
};

export const getRelativePosition = (absoluteX, absoluteY) => {
  const x = absoluteX - RADIUS;
  const y =
    absoluteY < RADIUS ? Math.abs(RADIUS - absoluteY) : RADIUS - absoluteY;
  return { x: x, y: y };
};
