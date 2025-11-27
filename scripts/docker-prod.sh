#!/bin/bash

# Script para facilitar o uso do Docker em produção

set -e

echo "🏭 Iniciando ambiente de produção..."

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📝 Copie .env.production.example para .env e configure as variáveis"
    exit 1
fi

# Verificar se DB_PASSWORD está definido e não é o padrão
if grep -q "CHANGE_THIS_PASSWORD_IN_PRODUCTION" .env; then
    echo "⚠️  ATENÇÃO: Altere a senha do banco de dados no arquivo .env!"
    read -p "Deseja continuar mesmo assim? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build e start
echo "🔨 Construindo e iniciando containers..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "⏳ Aguardando serviços iniciarem..."
sleep 10

# Verificar status
echo "📊 Status dos containers:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "✅ Ambiente de produção iniciado!"
echo ""
echo "📝 Comandos úteis:"
echo "  - Ver logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  - Parar: docker-compose -f docker-compose.prod.yml down"
echo "  - Acessar app: http://localhost:${PORT:-3000}"
echo "  - Health check: http://localhost:${PORT:-3000}/health"

