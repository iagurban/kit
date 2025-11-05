// ==================== ТОЧКИ И ВЕКТОРЫ ====================

/**
 * Расстояние до (0;0)
 */
export const distanceTo00 = (x: number, y: number) => Math.hypot(x, y);

/**
 * Расстояние между (0;0) и (1;1) в тех же единицах (~1.4142).
 */
export const distance00to11 = distanceTo00(1, 1);

/**
 * Расстояние между двумя точками.
 */
export const distance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1);

/**
 * Средняя точка (midpoint) между двумя точками.
 */
export const midpoint = (x1: number, y1: number, x2: number, y2: number): [number, number] => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
];

/**
 * Линейная интерполяция между a и b на t ∈ [0,1].
 */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Интерполяция между двумя точками.
 */
export const lerpPoint = (x1: number, y1: number, x2: number, y2: number, t: number): [number, number] => [
  lerp(x1, x2, t),
  lerp(y1, y2, t),
];

/**
 * Угол (в радианах) от точки (x1,y1) до (x2,y2).
 */
export const angleBetween = (x1: number, y1: number, x2: number, y2: number) => Math.atan2(y2 - y1, x2 - x1);

/**
 * Поворот точки (x,y) вокруг центра (cx,cy) на угол rad.
 */
export const rotatePoint = (x: number, y: number, cx: number, cy: number, rad: number): [number, number] => {
  const cos = Math.cos(rad),
    sin = Math.sin(rad);
  const dx = x - cx,
    dy = y - cy;
  return [dx * cos - dy * sin + cx, dx * sin + dy * cos + cy];
};

// ==================== ПРЯМОУГОЛЬНИКИ ====================

/**
 * Площадь прямоугольника.
 */
export const rectArea = (width: number, height: number) => width * height;

/**
 * Периметр прямоугольника.
 */
export const rectPerimeter = (width: number, height: number) => 2 * (width + height);

/**
 * Центр прямоугольника { x, y, width, height }.
 */
export const rectCenter = (x: number, y: number, width: number, height: number) =>
  [x + width / 2, y + height / 2] as [number, number];

/**
 * Проверка, лежит ли точка (px,py) внутри прямоугольника.
 */
export const pointInRect = (px: number, py: number, rx: number, ry: number, width: number, height: number) =>
  px >= rx && px <= rx + width && py >= ry && py <= ry + height;

/**
 * Пересекаются ли два прямоугольника?
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
) => r1x < r2x + w2 && r1x + w1 > r2x && r1y < r2y + h2 && r1y + h1 > r2y;

// ==================== КРУГИ ====================

/**
 * Площадь круга.
 */
export const circleArea = (r: number) => Math.PI * r * r;

/**
 * Длина окружности (периметр круга).
 */
export const circleCircumference = (r: number) => 2 * Math.PI * r;

/**
 * Координаты точки на окружности:
 * angleRad — угол в радианах от точки (cx,cy).
 */
export const pointOnCircle = (cx: number, cy: number, r: number, angleRad: number): [number, number] => [
  cx + r * Math.cos(angleRad),
  cy + r * Math.sin(angleRad),
];

/**
 * Входит ли точка (px,py) в круг (cx,cy,r)?
 */
export const pointInCircle = (px: number, py: number, cx: number, cy: number, r: number) =>
  distance(px, py, cx, cy) <= r;

// ==================== ТРЕУГОЛЬНИКИ ====================

/**
 * Площадь треугольника по координатам вершин (формула Штейнера).
 */
export const triangleArea = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) =>
  Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);

/**
 * Периметр треугольника по длинам сторон.
 */
export const trianglePerimeter = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) =>
  distance(x1, y1, x2, y2) + distance(x2, y2, x3, y3) + distance(x3, y3, x1, y1);

/**
 * Центроид (точка пересечения медиан) треугольника.
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
 * Проверка, лежит ли точка (px,py) внутри треугольника
 * (метод барицентрических координат).
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
) => {
  const A = triangleArea(x1, y1, x2, y2, x3, y3);
  const A1 = triangleArea(px, py, x2, y2, x3, y3);
  const A2 = triangleArea(x1, y1, px, py, x3, y3);
  const A3 = triangleArea(x1, y1, x2, y2, px, py);
  return Math.abs(A - (A1 + A2 + A3)) < 1e-6;
};

// ==================== ОБЩИЕ ====================

/**
 * Приведение градусы ↔ радианы.
 */
export const degToRad = (deg: number) => (deg * Math.PI) / 180;
export const radToDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Поворот прямоугольника на угол: возвращает новые координаты его вершин.
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
 * Получить ограничивающий прямоугольник (bounding box) для набора точек.
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
