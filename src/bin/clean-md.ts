import * as fs from 'fs';
import * as path from 'path';

// Фиксированный список файлов: первый явно, остальные автоматически по алфавиту (кроме первого)
const inputDir = '.temp-docs';
const firstFile = 'globals.md';
const excludes = ['README.md'];

const files = [
  path.join(inputDir, firstFile),
  ...fs
    .readdirSync(inputDir)
    .filter(f => f.endsWith('.md') && f !== firstFile && !excludes.includes(f))
    .sort()
    .map(f => path.join(inputDir, f)),
];

// Аргумент командной строки — путь к выходному файлу
const [, , outputFile] = process.argv;
if (!outputFile) {
  console.error('Usage: tsx concat-clean-md.ts <output.md>');
  process.exit(1);
}

// ——— Твоя "чистка" markdown (сюда копируй любой нужный код) ———
function cleanMarkdown(text: string): string {
  // Убираем пустые строки между заголовком 3+ и блоком кода с одной кавычкой
  text = text.replace(/(#{3,} .*)\n((?:\s*\n)+)(`[^\n]*\n)/g, (_m, header, _ws, codeblock) => {
    if (/^`{3,}/.test(codeblock)) {
      return `${header}\n${_ws}${codeblock}`;
    }
    return `${header} ${codeblock}`;
  });
  // Превращаем Defined in в курсивную ссылку (как выше)
  text = text.replace(/^Defined in: (packages\/[^\s:]+):(\d+)$/gm, (_m, filepath, line) => {
    const prefix = `../src/branch/main`;
    const link = filepath.startsWith(`packages/kit/`) ? filepath.replace(/^packages\/kit/, prefix) : filepath;
    return `_Defined in: [${filepath}:${line}](${link}#L${line})_`;
  });
  // Можно добавить сюда любые другие твои правила!
  return text;
}

// ——— Склейка всех файлов с чисткой ———
const combined = files
  .map(f => {
    if (!fs.existsSync(f)) {
      console.warn(`File not found: ${f}`);
      return '';
    }
    return cleanMarkdown(fs.readFileSync(f, 'utf8'));
  })
  .join('\n\n');

fs.writeFileSync(outputFile, combined);
console.log(`Combined ${files.length} files into ${outputFile}`);

// ——— КОПИРОВАНИЕ ВСЕХ ФАЙЛОВ В СТРУКТУРУ РЯДОМ С ВЫХОДНЫМ ———

// Каталог для копий
const outputDir = path.dirname(outputFile);
const copyDir = outputDir;

// Создаём папку, если нет
fs.mkdirSync(copyDir, { recursive: true });

for (const f of files) {
  if (!fs.existsSync(f)) {
    continue;
  }
  // Имя для копии
  const base = path.basename(f);
  const dest = path.join(copyDir, base);
  fs.copyFileSync(f, dest);
  // Можно выводить путь:
  console.log(`Copied ${f} → ${dest}`);
}
console.log(`Copied original files to: ${copyDir}`);
