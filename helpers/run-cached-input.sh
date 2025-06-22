#!/usr/bin/env bash
# run-cached-input: выполняет команду CMD только если входные файлы изменились относительно кеша

set -euo pipefail
shopt -s nullglob

show_usage() {
  cat <<EOF
Использование: $0 -i <input_glob> [-i <input_glob> ...] -x "<cmd>" -t <cache_dir>

  -i  glob или путь к файлу (можно повторять)  — входные файлы/маски
  -x  команда, которую надо запустить, если файлы изменились (в кавычках)
  -t  папка кеша, куда будут копироваться входные файлы

Пример:
  $0 -i "src/**/*.js" -i "config/*.yaml" -x "npm run build" -t .cache
EOF
  exit 1
}

# Парсим аргументы
declare -a inputs=()
cmd=""
cache_dir=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -i)
      shift
      [[ -z "${1:-}" ]] && show_usage
      inputs+=("$1")
      ;;
    -x)
      shift
      [[ -z "${1:-}" ]] && show_usage
      cmd="$1"
      ;;
    -t)
      shift
      [[ -z "${1:-}" ]] && show_usage
      cache_dir="$1"
      ;;
    -*)
      echo "Неизвестный параметр: $1" >&2
      show_usage
      ;;
    *)
      echo "Неожиданный аргумент: $1" >&2
      show_usage
      ;;
  esac
  shift
done

# Проверка обязательных параметров
if [[ -z "$cmd" || -z "$cache_dir" || ${#inputs[@]} -eq 0 ]]; then
  show_usage
fi

# Флаг обнаружения изменений
changed=0

# Проверяем каждый входной файл
for pattern in "${inputs[@]}"; do
  for src in $pattern; do
    # Если файл отсутствует во входных, пропускаем
    if [[ ! -e "$src" ]]; then
      echo "Предупреждение: файл '$src' не найден, пропускаем" >&2
      continue
    fi
    cache_path="$cache_dir/$src"
    if [[ ! -e "$cache_path" ]] || ! cmp -s -- "$src" "$cache_path"; then
      changed=1
      break 2
    fi
  done
done

if [[ $changed -eq 0 ]]; then
  echo "Файлы не изменились, выходим."
  exit 0
fi

# Запускаем команду
echo "Изменения обнаружены — выполняем: $cmd"
eval "$cmd"
exit_code=$?

if [[ $exit_code -ne 0 ]]; then
  echo "Команда завершилась с ошибкой (код $exit_code), выходим." >&2
  exit $exit_code
fi

# Обновляем кеш
echo "Копируем файлы в кеш '$cache_dir'..."
for pattern in "${inputs[@]}"; do
  for src in $pattern; do
    # Если файл отсутствует, пропускаем
    [[ ! -e "$src" ]] && continue
    dest="$cache_dir/$src"
    mkdir -p "$(dirname "$dest")"
    cp -- "$src" "$dest"
  done
done

echo "Кеш обновлен."
exit 0
