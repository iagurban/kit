/**
 * Calculates the Euclidean distance from a point (x, y) to the origin (0, 0).
 *
 * The function computes the straight-line distance using the Pythagorean theorem.
 * This formula essentially finds the length of the hypotenuse of a right triangle where
 * the legs are represented by the x and y coordinates.
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @returns {number} The calculated distance from the point (x, y) to the origin (0, 0).
 */
export const distanceTo00 = (x: number, y: number): number => Math.hypot(x, y);
/**
 * Represents the distance from coordinate (0, 0) to coordinate (1, 1).
 *
 * This variable is assigned the result of invoking the `distanceTo00` function
 * with x and y arguments set to 1, calculating the distance from the origin
 * to the point (1, 1).
 *
 * Value is computed based on the specific implementation of `distanceTo00`.
 */
export const distance00to11 = distanceTo00(1, 1);
/**
 * Calculates the Euclidean distance between two points in a 2D Cartesian coordinate system.
 *
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
export const distance = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.hypot(x2 - x1, y2 - y1);
/**
 * Calculates the midpoint of a line segment defined by two points (x1, y1) and (x2, y2).
 *
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {[number, number]} The coordinates of the midpoint as a tuple [x, y].
 */
export const midpoint = (x1: number, y1: number, x2: number, y2: number): [number, number] => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
];
/**
 * Linearly interpolates between two numbers, `a` and `b`, based on the interpolation factor `t`.
 *
 * @param {number} a - The starting value.
 * @param {number} b - The ending value.
 * @param {number} t - The interpolation factor, typically between 0 (returns `a`) and 1 (returns `b`).
 * @returns {number} The interpolated value between `a` and `b` based on `t`.
 */
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
/**
 * Computes a point along a linear interpolation between two points in a 2D space.
 *
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @param {number} t - The interpolation factor, typically in the range [0, 1], where 0 represents the first point and 1 represents the second point.
 * @returns {[number, number]} The interpolated point as an array in the format [x, y].
 */
export const lerpPoint = (x1: number, y1: number, x2: number, y2: number, t: number): [number, number] => [
  lerp(x1, x2, t),
  lerp(y1, y2, t),
];

/**
 * Calculates the angle in radians between two points (x1, y1) and (x2, y2).
 *
 * The angle is determined using the arctangent of the difference in y-coordinates
 * divided by the difference in x-coordinates. It is measured counterclockwise
 * from the positive x-axis.
 *
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} The angle in radians between the two points.
 */
export const angleBetween = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.atan2(y2 - y1, x2 - x1);
/**
 * Rotates a point around a specified pivot point by a given angle in radians.
 *
 * @param {number} x The x-coordinate of the point to be rotated.
 * @param {number} y The y-coordinate of the point to be rotated.
 * @param {number} cx The x-coordinate of the pivot point around which rotation occurs.
 * @param {number} cy The y-coordinate of the pivot point around which rotation occurs.
 * @param {number} rad The angle of rotation in radians.
 * @returns {[number, number]} The coordinates of the rotated point as a tuple [x, y].
 */
export const rotatePoint = (x: number, y: number, cx: number, cy: number, rad: number): [number, number] => {
  const cos = Math.cos(rad),
    sin = Math.sin(rad);
  const dx = x - cx,
    dy = y - cy;
  return [dx * cos - dy * sin + cx, dx * sin + dy * cos + cy];
};

/**
 * Calculates the area of a rectangle.
 *
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {number} The calculated area of the rectangle.
 */
export const rectArea = (width: number, height: number): number => width * height;
/**
 * Calculates the perimeter of a rectangle.
 *
 * This function takes the width and height of a rectangle as arguments
 * and returns the perimeter, which is computed as 2 times the sum of
 * the width and height.
 *
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {number} The perimeter of the rectangle.
 */
export const rectPerimeter = (width: number, height: number): number => 2 * (width + height);
/**
 * Calculates the center point of a rectangle.
 *
 * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
 * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {[number, number]} The coordinates of the center point as a tuple [centerX, centerY].
 */
export const rectCenter = (x: number, y: number, width: number, height: number): [number, number] =>
  [x + width / 2, y + height / 2] as [number, number];
/**
 * Determines whether a point lies within a given rectangle.
 *
 * @param {number} px - The x-coordinate of the point to check.
 * @param {number} py - The y-coordinate of the point to check.
 * @param {number} rx - The x-coordinate of the top-left corner of the rectangle.
 * @param {number} ry - The y-coordinate of the top-left corner of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {boolean} Returns true if the point (px, py) is within the bounds of the rectangle, otherwise false.
 */
export const pointInRect = (
  px: number,
  py: number,
  rx: number,
  ry: number,
  width: number,
  height: number
): boolean => px >= rx && px <= rx + width && py >= ry && py <= ry + height;

/**
 * Determines whether two rectangles intersect.
 *
 * @param {number} r1x - The x-coordinate of the top-left corner of the first rectangle.
 * @param {number} r1y - The y-coordinate of the top-left corner of the first rectangle.
 * @param {number} w1 - The width of the first rectangle.
 * @param {number} h1 - The height of the first rectangle.
 * @param {number} r2x - The x-coordinate of the top-left corner of the second rectangle.
 * @param {number} r2y - The y-coordinate of the top-left corner of the second rectangle.
 * @param {number} w2 - The width of the second rectangle.
 * @param {number} h2 - The height of the second rectangle.
 * @returns {boolean} Returns `true` if the rectangles intersect, otherwise `false`.
 */
export const rectsIntersect = (
  r1x: number,
  r1y: number,
  w1: number,
  h1: number,
  r2x: number,
  r2y: number,
  w2: number,
  h2: number
): boolean => r1x < r2x + w2 && r1x + w1 > r2x && r1y < r2y + h2 && r1y + h1 > r2y;

/**
 * Calculates the area of a circle based on the given radius.
 *
 * @param {number} r - The radius of the circle. Must be a non-negative number.
 * @returns {number} The area of the circle.
 */
export const circleArea = (r: number): number => Math.PI * r * r;
/**
 * Calculates the circumference of a circle given its radius.
 *
 * @param {number} r - The radius of the circle.
 * @returns {number} The circumference of the circle.
 */
export const circleCircumference = (r: number): number => 2 * Math.PI * r;
/**
 * Calculates the coordinates of a point on the circumference of a circle given the circle's center, radius, and an angle in radians.
 *
 * @param {number} cx - The x-coordinate of the circle's center.
 * @param {number} cy - The y-coordinate of the circle's center.
 * @param {number} r - The radius of the circle.
 * @param {number} angleRad - The angle in radians at which to compute the point on the circle.
 * @returns {[number, number]} A tuple representing the x and y coordinates of the point on the circle.
 */
export const pointOnCircle = (cx: number, cy: number, r: number, angleRad: number): [number, number] => [
  cx + r * Math.cos(angleRad),
  cy + r * Math.sin(angleRad),
];
/**
 * Determines whether a point lies within or on the boundary of a circle.
 *
 * @param {number} px - The x-coordinate of the point to check.
 * @param {number} py - The y-coordinate of the point to check.
 * @param {number} cx - The x-coordinate of the circle's center.
 * @param {number} cy - The y-coordinate of the circle's center.
 * @param {number} r - The radius of the circle.
 * @returns {boolean} True if the point is inside or on the boundary of the circle, false otherwise.
 */
export const pointInCircle = (px: number, py: number, cx: number, cy: number, r: number): boolean =>
  distance(px, py, cx, cy) <= r;

/**
 * Calculates the area of a triangle given the coordinates of its vertices.
 *
 * @param {number} x1 - The x-coordinate of the first vertex.
 * @param {number} y1 - The y-coordinate of the first vertex.
 * @param {number} x2 - The x-coordinate of the second vertex.
 * @param {number} y2 - The y-coordinate of the second vertex.
 * @param {number} x3 - The x-coordinate of the third vertex.
 * @param {number} y3 - The y-coordinate of the third vertex.
 * @returns {number} The absolute area of the triangle.
 */
export const triangleArea = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): number => Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);

/**
 * Calculates the perimeter of a triangle given the coordinates of its three vertices.
 *
 * @param {number} x1 - The x-coordinate of the first vertex.
 * @param {number} y1 - The y-coordinate of the first vertex.
 * @param {number} x2 - The x-coordinate of the second vertex.
 * @param {number} y2 - The y-coordinate of the second vertex.
 * @param {number} x3 - The x-coordinate of the third vertex.
 * @param {number} y3 - The y-coordinate of the third vertex.
 * @returns {number} The perimeter of the triangle.
 */
export const trianglePerimeter = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): number => distance(x1, y1, x2, y2) + distance(x2, y2, x3, y3) + distance(x3, y3, x1, y1);

/**
 * Calculates the centroid (geometric center) of a triangle given the coordinates
 * of its three vertices.
 *
 * The centroid is the point that is the average position of all the points
 * in the triangle.
 *
 * @param {number} x1 - The x-coordinate of the first vertex of the triangle.
 * @param {number} y1 - The y-coordinate of the first vertex of the triangle.
 * @param {number} x2 - The x-coordinate of the second vertex of the triangle.
 * @param {number} y2 - The y-coordinate of the second vertex of the triangle.
 * @param {number} x3 - The x-coordinate of the third vertex of the triangle.
 * @param {number} y3 - The y-coordinate of the third vertex of the triangle.
 * @returns {[number, number]} The x and y coordinates of the triangle's centroid as a tuple.
 */
export const triangleCentroid = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): [number, number] => [(x1 + x2 + x3) / 3, (y1 + y2 + y3) / 3];
/**
 * Determines if a point is inside a triangle using the area comparison method.
 *
 * This function checks if the given point (px, py) lies inside the triangle defined by
 * the vertices (x1, y1), (x2, y2), and (x3, y3). It calculates the area of the triangle
 * and compares it to the sum of the areas of three sub-triangles formed by the point and
 * each side of the triangle.
 *
 * @param {number} px - The x-coordinate of the point to check.
 * @param {number} py - The y-coordinate of the point to check.
 * @param {number} x1 - The x-coordinate of the first vertex of the triangle.
 * @param {number} y1 - The y-coordinate of the first vertex of the triangle.
 * @param {number} x2 - The x-coordinate of the second vertex of the triangle.
 * @param {number} y2 - The y-coordinate of the second vertex of the triangle.
 * @param {number} x3 - The x-coordinate of the third vertex of the triangle.
 * @param {number} y3 - The y-coordinate of the third vertex of the triangle.
 * @returns {boolean} Returns true if the point lies inside the triangle, false otherwise.
 */
export const pointInTriangle = (
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): boolean => {
  const a = triangleArea(x1, y1, x2, y2, x3, y3);
  const a1 = triangleArea(px, py, x2, y2, x3, y3);
  const a2 = triangleArea(x1, y1, px, py, x3, y3);
  const a3 = triangleArea(x1, y1, x2, y2, px, py);
  return Math.abs(a - (a1 + a2 + a3)) < 1e-6;
};

/**
 * Converts an angle from degrees to radians.
 *
 * @param {number} deg - The angle in degrees to be converted.
 * @returns {number} The equivalent angle in radians.
 */
export const degToRad = (deg: number): number => (deg * Math.PI) / 180;
/**
 * Converts a value from radians to degrees.
 *
 * @param {number} rad - The angle in radians to be converted.
 * @returns {number} The equivalent angle in degrees.
 */
export const radToDeg = (rad: number): number => (rad * 180) / Math.PI;

/**
 * Rotates a rectangle around a given center point by a specified angle in radians.
 *
 * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
 * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {number} cx - The x-coordinate of the center point of rotation.
 * @param {number} cy - The y-coordinate of the center point of rotation.
 * @param {number} angleRad - The angle of rotation in radians.
 * @returns {[number, number][]} An array of the rotated rectangle's corner coordinates as [x, y] pairs.
 */
export const rotateRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  cx: number,
  cy: number,
  angleRad: number
): [number, number][] => {
  const corners: [number, number][] = [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
  ];
  return corners.map(([px, py]) => rotatePoint(px, py, cx, cy, angleRad));
};

/**
 * Calculates the bounding box of a given set of points.
 *
 * @param {Array<[number, number]>} points - An array of points where each point is represented as a tuple containing two numbers [x, y].
 * @returns {{x: number, y: number, width: number, height: number}} An object describing the bounding box, including
 * - `x`: The smallest x-coordinate of the bounding box.
 * - `y`: The smallest y-coordinate of the bounding box.
 * - `width`: The width of the bounding box, calculated as the difference between the maximum and minimum x-coordinates.
 * - `height`: The height of the bounding box, calculated as the difference between the maximum and minimum y-coordinates.
 */
export const boundingBox = (
  points: [number, number][]
): { x: number; y: number; width: number; height: number } => {
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs);
  const minY = Math.min(...ys),
    maxY = Math.max(...ys);
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};
