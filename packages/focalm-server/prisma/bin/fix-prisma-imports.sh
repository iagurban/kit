#!/usr/bin/bash

find ./src/generated/nestgraphql -type f -name '*.ts' -exec sed -i "s/\/runtime\/library'/\/runtime\/binary'/g" {} \;
