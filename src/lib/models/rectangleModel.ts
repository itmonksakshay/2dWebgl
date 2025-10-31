export const createRectangle = (
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  depth: number
) => {
  const x1 = x;
  const y1 = y;
  const z1 = z;
  const x2 = x + width;
  const y2 = y + height;
  const z2 = z + depth;
  return [
    x1,
    y1,
    z1,
    x2,
    y1,
    z1,
    x1,
    y2,
    z1,
    x2,
    y2,
    z1,
    x1,
    y1,
    z2,
    x2,
    y1,
    z2,
    x1,
    y2,
    z2,
    x2,
    y2,
    z2,
  ];
};

export const createLetterF = () => {
  return [
    // left column
    0, 0, 0, 30, 0, 0, 0, 150, 0, 0, 150, 0, 30, 0, 0, 30, 150, 0,

    // top rung
    30, 0, 0, 100, 0, 0, 30, 30, 0, 30, 30, 0, 100, 0, 0, 100, 30, 0,

    // middle rung
    30, 60, 0, 67, 60, 0, 30, 90, 0, 30, 90, 0, 67, 60, 0, 67, 90, 0,
  ];
};
