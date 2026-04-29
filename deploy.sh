#!/bin/bash

OUTPUT_FILE="deploy_links.txt"
ITERATIONS=1

# limpiar archivo y agregar encabezado con fecha
echo "=== Start: $(date '+%Y-%m-%d %H:%M:%S') ===" > "$OUTPUT_FILE"

for i in $(seq 1 $ITERATIONS); do
  echo "Running deploy $i..."

  netlify deploy --prod --dir . --auth=nfp_WAvruucfE9PJezGNPwxGxmGnPVXXfavh922c 2>&1 \
    | grep -Eo 'https://[a-z0-9]+--[a-z0-9-]+\.netlify\.app' \
    >> "$OUTPUT_FILE"

  sleep 2
done

echo "Done. Links saved in $OUTPUT_FILE"
