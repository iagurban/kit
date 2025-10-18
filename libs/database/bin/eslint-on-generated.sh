#!/usr/bin/env bash
set -euo pipefail

# Параметры
ROOT_DIR="./src/generated"
BATCH_SIZE=200      # число файлов в одном пакете
PARALLEL_PROCS=2   # число параллельных ESLint-процессов

# Ваши аргументы ESLint
ESLINT_ARGS=(
  "--cache"
  "--quiet"
  "--no-error-on-unmatched-pattern"
  "--rule=@typescript-eslint/no-empty-object-type:off"
  "--rule=@typescript-eslint/no-explicit-any:off"
  "--rule=@typescript-eslint/no-unnecessary-type-constraint:off"
  "--rule=@typescript-eslint/no-unsafe-function-type:off"
  "--rule=@typescript-eslint/no-namespace:off"
  "--fix"
)

# Собираем все JS/TS-файлы и шлём их xargs (нулевой разделитель, пакеты по BATCH_SIZE, P параллельных)
find "$ROOT_DIR" \
  -type f \
  \( -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' \) \
  -print0 \
| xargs -0 -n "$BATCH_SIZE" -P "$PARALLEL_PROCS" eslint "${ESLINT_ARGS[@]}"

# Пустая строка в конце файла — чтобы не «зацепить» слэшом EOF
