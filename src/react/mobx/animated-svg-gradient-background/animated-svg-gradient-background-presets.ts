const gradientRotateAnimation = (rotateKeyframes: readonly { angle: number; keyTime: number }[]) => {
  const valsArr: number[] = [];
  const timesArr: number[] = [];
  for (const { angle, keyTime } of rotateKeyframes) {
    valsArr.push(angle);
    timesArr.push(keyTime);
  }
  if ((timesArr.at(-1) ?? 0) < 1) {
    valsArr.push(rotateKeyframes[0].angle);
    timesArr.push(1);
  }

  return {
    values: valsArr.map(angle => `${angle} 0.5 0.5`).join(';'),
    keyTimes: timesArr.join(';'),
  };
};

/**
 * A collection of preset gradients.
 */
export const gradientPresets = (() => {
  const g = (offset: number, color: string) => ({ offset, color });
  return {
    sunSky: [
      g(0, '#ffe688'), // нежно-жёлтый, но не белый
      g(1, '#b3e2ff'), // свежий светлый голубой
    ],
    sandSea: [
      g(0, '#ffe0ac'), // мягкий песочный
      g(1, '#85c9ff'), // живой голубой, не кислотный
    ],
    lemonNavy: [
      g(0, '#fff99a'), // насыщенный, но не ядовитый лимонный
      g(1, '#7ea3e2'), // приглушённый синий
    ],
    magentaNight: [
      g(0, '#eed9fa'), // светлый фиолетовый с пигментом
      g(1, '#ffb3c6'), // спокойный, но читаемый розовый
    ],
    lavaWarning: [
      g(0, '#eab0fc'), // светлый лавандовый
      g(0.5, '#ffb3b3'), // светлый, но розовый-красный
      g(1, '#fff1f5'), // почти белый (но оттенок есть)
    ],
    calmBlue: [
      g(0, '#e3ecfa'), // мягкий голубой
      g(1, '#b6cbe6'), // пудрово-голубой
    ],
    mintRed: [
      g(0, '#c8fcea'), // мятный с заметным тоном
      g(1, '#ffc7d2'), // светло-красный, но не бьёт по глазам
    ],
    sandCloud: [
      g(0, '#fdf6e3'), // тёплый светлый бежевый
      g(1, '#e8e3d3'), // чуть серее, но не мрачно
    ],
    insta: [g(0, '#fdf497'), g(0.5, '#fd5949'), g(1, '#d6249f')],
    mintBlue: [g(0, '#a8edea'), g(1, '#fed6e3')],
    // Светлая, но явно жёлтая полоска
    stripeSoftYellow: [
      g(0, '#faf3c0'),
      g(0.48, '#faf3c0'),
      g(0.495, '#fffbe0'),
      g(0.505, '#fffbe0'),
      g(0.52, '#faf3c0'),
      g(1, '#faf3c0'),
    ],
    stripeSoftBlue: [
      g(0, '#e6f7fb'),
      g(0.48, '#e6f7fb'),
      g(0.495, '#b3e2ff'),
      g(0.505, '#b3e2ff'),
      g(0.52, '#e6f7fb'),
      g(1, '#e6f7fb'),
    ],
    sunsetSmooth: [
      g(0, '#fff7ae'), // светло-жёлтый
      g(0.2, '#ffd6ae'), // мягкий персиковый
      g(0.4, '#ffc1cc'), // светло-розовый
      g(0.65, '#c9b6f4'), // сиренево-голубой
      g(0.85, '#a5d8ff'), // небесно-голубой
      g(1, '#c3fff7'), // голубой с бирюзой
    ],
    mintDream: [
      g(0, '#e0ffd6'), // светлая мята
      g(0.25, '#d2f1ff'), // нежный голубой
      g(0.5, '#b0e5ff'), // чуть ярче голубой
      g(0.7, '#ffc5e6'), // очень светлый розовый
      g(0.9, '#fff3c8'), // пастельный жёлтый
      g(1, '#e7ffe9'), // светлый зелёный
    ],
    lavenderField: [
      g(0, '#f6e6ff'), // светлый сиреневый
      g(0.2, '#e3cbff'), // более насыщенный лавандовый
      g(0.4, '#b8b6f7'), // голубовато-сиреневый
      g(0.6, '#a0c4ff'), // пудрово-голубой
      g(0.8, '#e0ffe0'), // мятный
      g(1, '#fff7e0'), // бежево-жёлтый
    ],
    coralSplash: [
      g(0, '#e6b68d'), // персиково-оранжевый
      g(0.08, '#ffe8cb'), // светлый песочный
      g(0.26, '#f9fcc4'), // светлый жёлтый
      g(0.54, '#d3f7ec'), // светло-бирюзовый
      g(0.72, '#bae1ff'), // пастельный голубой
      g(1, '#ffb4e6'), // розово-коралловый
    ],
    rainbowSerene: [
      g(0, '#ffe0e6'), // светло-розовый
      g(0.15, '#fff3e0'), // персиковый
      g(0.33, '#f5ffd9'), // светло-зелёный
      g(0.52, '#e0f7ff'), // голубой
      g(0.7, '#e6e9ff'), // светлый фиолетово-голубой
      g(0.85, '#fff1e0'), // кремовый
      g(1, '#ffe0e9'), // розовый
    ],
    oceanDeepSmooth: [
      g(0, '#a8edea'), // мятно-бирюзовый
      g(0.2, '#78c7e5'), // свежий голубой
      g(0.4, '#60a3d9'), // приглушённый синий
      g(0.6, '#6d8fc7'), // светло-синий
      g(0.8, '#b5b8e3'), // лавандовый синий
      g(1, '#e0ecff'), // пастельный голубой
    ],
  } as const;
})();

/**
 * A collection of preset background position animations.
 */
export const moveAnimations = (() => {
  const p = (x: number, y: number) => ({ backgroundPosition: `${x}% ${y}%` });
  return {
    basic: [p(0, 0), p(0, 100), p(100, 100), p(100, 0)],
    drift: [p(0, 50), p(100, 50)],
    vertical: [p(50, 0), p(50, 100)],
    spiral: [p(0, 0), p(25, 100), p(50, 0), p(75, 100), p(100, 0)],
    bounce: [p(50, 0), p(50, 100), p(50, 0)],
    diagonal: [p(0, 0), p(100, 100), p(0, 0)],
    zigzag: [p(0, 0), p(100, 50), p(0, 100), p(100, 50), p(0, 0)],
  } as const;
})();

/**
 * A collection of preset gradient rotation animations.
 */
export const rotateAnimations = (() => {
  const m = (angle: number, keyTime: number) => ({ angle, keyTime });
  return {
    fullCircle: gradientRotateAnimation([m(0, 0), m(360, 1)]),
    halfCircle: gradientRotateAnimation([m(0, 0), m(180, 0.5), m(0, 1)]),
    quarterTurn: gradientRotateAnimation([m(0, 0), m(90, 1)]),
    backAndForth: gradientRotateAnimation([m(0, 0), m(180, 0.5), m(0, 1)]),
    slowCircle: gradientRotateAnimation([m(0, 0), m(360, 1)]),
    fastShake: gradientRotateAnimation([
      m(0, 0),
      m(20, 0.1),
      m(-20, 0.2),
      m(15, 0.3),
      m(-15, 0.4),
      m(0, 0.5),
      m(20, 0.6),
      m(-20, 0.7),
      m(15, 0.8),
      m(-15, 0.9),
      m(0, 1),
    ]),
    tripleBounce: gradientRotateAnimation([
      // туда-сюда-сюда
      m(0, 0),
      m(120, 0.33),
      m(-120, 0.66),
      m(0, 1),
    ]),
    pauseInMiddle: gradientRotateAnimation([
      // пауза на середине
      m(0, 0),
      m(180, 0.5),
      m(180, 0.7),
      m(0, 1),
    ]),
    randomJump: gradientRotateAnimation([
      // резкие скачки
      m(0, 0),
      m(110, 0.17),
      m(-30, 0.34),
      m(240, 0.51),
      m(150, 0.68),
      m(310, 0.84),
      m(360, 1),
    ]),
    drift: gradientRotateAnimation([
      // очень плавно, с остановкой в начале и конце
      m(0, 0),
      m(0, 0.1),
      m(45, 0.3),
      m(100, 0.55),
      m(200, 0.8),
      m(360, 1),
    ]),
    gentleSway: gradientRotateAnimation([
      // «волна» без полного оборота
      m(0, 0),
      m(20, 0.2),
      m(-20, 0.4),
      m(15, 0.6),
      m(-10, 0.8),
      m(0, 1),
    ]),
    doubleCircle: gradientRotateAnimation([
      // двойной оборот за цикл
      m(0, 0),
      m(720, 1),
    ]),
    sawWave: gradientRotateAnimation([
      // “пила” — плавно и резко назад
      m(0, 0),
      m(60, 0.15),
      m(120, 0.3),
      m(180, 0.45),
      m(240, 0.6),
      m(300, 0.75),
      m(360, 0.9),
      m(0, 1),
    ]),
  } as const;
})();
