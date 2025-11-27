set -e

echo "Iniciando ambiente de desenvolvimento..."

if [ ! -f .env ]; then
    echo "Criando arquivo .env a partir do exemplo..."
    cp .env.development.example .env
    echo "Arquivo .env criado!"
fi

if docker-compose ps | grep -q "design-furniture-app-dev"; then
    echo "Containers já existem. Iniciando..."
    docker-compose up -d
else
    echo "Primeira execução. Construindo containers..."
    docker-compose up -d --build
fi

echo "Aguardando serviços iniciarem..."
sleep 5

echo "Status dos containers:"
docker-compose ps

echo ""
echo "Ambiente de desenvolvimento iniciado!"
echo ""
echo "Hot-reload está ativo! Alterações em src/ são detectadas automaticamente."
echo ""
echo "Comandos úteis:"
echo "  - Ver logs: docker-compose logs -f app"
echo "  - Parar: docker-compose down"
echo "  - Rebuild (após mudar package.json): docker-compose build app"
echo "  - Acessar app: http://localhost:3000"
echo "  - Health check: http://localhost:3000/health"
echo ""
echo "Dica: Mantenha 'docker-compose logs -f app' aberto para ver o hot-reload!"

