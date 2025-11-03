// mat3.ts

export type Mat3 = readonly number[] & { length: 9 };

export const mat3 = {
  /** Returns a new 3x3 identity matrix */
  identity(): Mat3 {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },

  /** Creates a 3x3 translation matrix */
  translation(trans: [number, number]): Mat3 {
    return [1, 0, 0, 0, 1, 0, trans[0], trans[1], 1];
  },

  /** Creates a 3x3 rotation matrix (angle in radians) */
  rotation(angle: number): Mat3 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [c, s, 0, -s, c, 0, 0, 0, 1];
  },

  radianRotation(rotation: [number, number]): Mat3 {
    return [rotation[1], rotation[0], 0, -rotation[0], rotation[1], 0, 0, 0, 1];
  },

  /** Creates a 3x3 scaling matrix */
  scaling(scale: [number, number]): Mat3 {
    return [scale[0], 0, 0, 0, scale[1], 0, 0, 0, 1];
  },

  /** Multiplies two 3x3 matrices (column-major order) */
  multiply(a: Mat3, b: Mat3): Mat3 {
    return [
      a[0] * b[0] + a[3] * b[1] + a[6] * b[2],
      a[1] * b[0] + a[4] * b[1] + a[7] * b[2],
      a[2] * b[0] + a[5] * b[1] + a[8] * b[2],

      a[0] * b[3] + a[3] * b[4] + a[6] * b[5],
      a[1] * b[3] + a[4] * b[4] + a[7] * b[5],
      a[2] * b[3] + a[5] * b[4] + a[8] * b[5],

      a[0] * b[6] + a[3] * b[7] + a[6] * b[8],
      a[1] * b[6] + a[4] * b[7] + a[7] * b[8],
      a[2] * b[6] + a[5] * b[7] + a[8] * b[8],
    ];
  },

  /** Transforms a 2D point (x, y) using matrix m */
  transformPoint(m: Mat3, x: number, y: number) {
    return {
      x: x * m[0] + y * m[3] + m[6],
      y: x * m[1] + y * m[4] + m[7],
    };
  },
} as const;
