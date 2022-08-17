export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const getCoordinate = (radius, angle) => {
  const offsetX = Math.cos(toRadians(angle)) * radius;
  const offsetY = Math.sin(toRadians(angle)) * radius;
  return { x: offsetX, y: offsetY };
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
