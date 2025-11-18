import {
  angleBetween,
  boundingBox,
  circleArea,
  circleCircumference,
  degToRad,
  distance,
  distance00to11,
  distanceTo00,
  lerp,
  lerpPoint,
  midpoint,
  pointInCircle,
  pointInRect,
  pointInTriangle,
  pointOnCircle,
  radToDeg,
  rectArea,
  rectCenter,
  rectPerimeter,
  rectsIntersect,
  rotatePoint,
  rotateRect,
  triangleArea,
  triangleCentroid,
  trianglePerimeter,
} from './geometry';

// Jest test suite for geometry utilities

describe('Points and Vectors', () => {
  test('distanceTo00 returns correct distance to origin', () => {
    expect(distanceTo00(3, 4)).toBe(5);
  });

  test('distance00to11 constant is approx sqrt(2)', () => {
    expect(distance00to11).toBeCloseTo(Math.SQRT2);
  });

  test('distance between two points', () => {
    expect(distance(1, 1, 4, 5)).toBe(5);
  });

  test('midpoint calculation', () => {
    expect(midpoint(0, 0, 4, 6)).toEqual([2, 3]);
  });

  test('lerp and lerpPoint', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerpPoint(0, 0, 10, 10, 0.25)).toEqual([2.5, 2.5]);
  });

  test('angleBetween basic quadrants', () => {
    expect(angleBetween(0, 0, 1, 0)).toBe(0);
    expect(angleBetween(0, 0, 0, 1)).toBeCloseTo(Math.PI / 2);
  });

  test('rotatePoint around center', () => {
    const [x, y] = rotatePoint(1, 0, 0, 0, Math.PI / 2);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(1);
  });
});

describe('Rectangles', () => {
  test('rectArea and rectPerimeter', () => {
    expect(rectArea(3, 4)).toBe(12);
    expect(rectPerimeter(3, 4)).toBe(14);
  });

  test('rectCenter', () => {
    expect(rectCenter(0, 0, 8, 6)).toEqual([4, 3]);
  });

  test('pointInRect inside and outside', () => {
    expect(pointInRect(5, 5, 0, 0, 10, 10)).toBe(true);
    expect(pointInRect(-1, 5, 0, 0, 10, 10)).toBe(false);
  });

  test('rectsIntersect true and false', () => {
    expect(rectsIntersect(0, 0, 5, 5, 4, 4, 5, 5)).toBe(true);
    expect(rectsIntersect(0, 0, 3, 3, 4, 4, 2, 2)).toBe(false);
  });
});

describe('Circles', () => {
  test('circleArea and circumference', () => {
    expect(circleArea(2)).toBeCloseTo(Math.PI * 4);
    expect(circleCircumference(2)).toBeCloseTo(2 * Math.PI * 2);
  });

  test('pointOnCircle and pointInCircle', () => {
    const [x, y] = pointOnCircle(0, 0, 5, 0);
    expect(x).toBeCloseTo(5);
    expect(y).toBeCloseTo(0);
    expect(pointInCircle(3, 4, 0, 0, 5)).toBe(true);
    expect(pointInCircle(6, 0, 0, 0, 5)).toBe(false);
  });
});

describe('Triangles', () => {
  test('triangleArea and perimeter', () => {
    expect(triangleArea(0, 0, 4, 0, 0, 3)).toBe(6);
    expect(trianglePerimeter(0, 0, 4, 0, 0, 3)).toBeCloseTo(4 + 3 + 5);
  });

  test('triangleCentroid', () => {
    expect(triangleCentroid(0, 0, 6, 0, 0, 6)).toEqual([2, 2]);
  });

  test('pointInTriangle inside and outside', () => {
    // Right triangle
    expect(pointInTriangle(1, 1, 0, 0, 2, 0, 0, 2)).toBe(true);
    expect(pointInTriangle(3, 3, 0, 0, 2, 0, 0, 2)).toBe(false);
  });
});

describe('Helpers and Conversions', () => {
  test('degToRad and radToDeg roundtrip', () => {
    const deg = 180;
    const rad = degToRad(deg);
    expect(radToDeg(rad)).toBeCloseTo(deg);
  });
});

describe('Advanced:', () => {
  test('rotateRect and boundingBox', () => {
    const rect = rotateRect(0, 0, 2, 2, 0, 0, Math.PI / 4);
    const box = boundingBox(rect);
    // bounding box of a square rotated 45° has width = height = side * sqrt(2)
    expect(box.width).toBeCloseTo(2 * Math.SQRT2);
    expect(box.height).toBeCloseTo(2 * Math.SQRT2);
  });
});
