#!/bin/bash

SENSITIVE_FILES="id_rsa id_rsa.pub .env .env.local .env.production .pem .pfx"

# Captura os arquivos no staging
FILES=$(git diff --cached --name-only)

echo "Arquivos comitados: $FILES"  # Adicionando log para depuração

for FILE in $FILES; do
  for SENSITIVE in $SENSITIVE_FILES; do
    if [[ "$FILE" == *"$SENSITIVE"* ]]; then
      echo "🚨 Erro: Você está tentando enviar um arquivo sensível ($FILE)!"
      exit 1
    fi
  done
done

exit 0