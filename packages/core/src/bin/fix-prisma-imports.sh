#!/usr/bin/bash

echo '[fix prisma imports]'
find ./src/generated/nestgraphql -type f -name '*.ts' -exec sed -i "s/\/runtime\/library'/\/runtime\/binary'/g" {} \;
echo '[finish]'
