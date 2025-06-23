/**
 * Генерирует кортежи [color, percent] с равномерным распределением процентов
 * @param colors Массив цветов
 * @returns Массив пар [color, percent] с равномерными процентами (от 0 до 100)
 * @example
 * enhanceGradientPercentsEvenly(["#fff", "#f00", "#000"])
 * // [["#fff", 0], ["#f00", 50], ["#000", 100]]
 */
export const enhanceGradientPercentsEvenly = (colors: string[]): [string, number][] => {
  const n = colors.length;
  return colors.map((color, i) => [color, (i / (n - 1)) * 100]);
};

/**
 * Формирует строку CSS linear-gradient из массива кортежей [color, percent]
 * @param stops Массив [color, percent]
 * @param angle Угол наклона (строка "45deg" или число — градусы, по умолчанию 90deg)
 * @returns CSS строка linear-gradient
 * @example
 * buildLinearGradient([
 *   ["#fff", 0],
 *   ["#f00", 50],
 *   ["#000", 100]
 * ], 45)
 * // "linear-gradient(45deg, #fff 0%, #f00 50%, #000 100%)"
 */
export const buildLinearGradient = (stops: [string, number][], angle: string | number = 90): string => {
  const angleStr = typeof angle === 'number' ? `${angle}deg` : angle;
  const stopsStr = stops.map(([color, percent]) => `${color} ${percent.toFixed(2)}%`).join(', ');
  return `linear-gradient(${angleStr}, ${stopsStr})`;
};

export const backgrounds = {
  calm: buildLinearGradient(
    [
      [`hsl( 50, 80%, 90%)`, 0], // лимонный
      [`hsl( 65, 85%, 92%)`, 20], // мягкий золотистый
      [`hsl(190, 50%, 94%)`, 35], // светлый голубой
      [`hsl(210, 60%, 92%)`, 45], // небесный синий
      [`hsl(240, 60%, 92%)`, 65], // классический синий
      [`hsl(272, 48%, 94%)`, 80], // фиолетовый
      [`hsl(309, 46%, 92%)`, 90], // розово-фиолетовый
      [`hsl(350, 50%, 94%)`, 100],
    ],
    135
  ),
  calmBright: buildLinearGradient(
    [
      [`hsl( 45, 60%, 92%)`, 0], // бледно-мёдово-лимонный
      [`hsl(211, 70%, 94%)`, 10], // нежный бирюзово-голубой
      [`hsl(266, 47%, 94%)`, 25], // светлая лаванда
      [`hsl( 65, 70%, 90%)`, 40], // очень мягкий золотистый
      [`hsl(261, 44%, 92%)`, 55], // лёгкий ультрамарин
      [`hsl(330, 50%, 95%)`, 70], // бледно-розово-фиолетовый
      [`hsl(180, 40%, 94%)`, 85], // дымчатый аквамарин
      [`hsl( 15, 80%, 90%)`, 100], // очень светлый персиковый
    ],
    135
  ),
} satisfies Record<string, string>;
