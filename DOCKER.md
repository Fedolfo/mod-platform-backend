# Guia Docker - Design Furniture Backend

## Pré-requisitos

- Docker Desktop instalado (ou Docker Engine + Docker Compose)
- Portas 3000 e 5433 disponíveis

## Desenvolvimento

### 1. Configurar ambiente

Copie o arquivo de exemplo:

```bash
cp .env.development.example .env
```

### 2. Iniciar containers

```bash
docker-compose up -d
```

Ou para ver os logs em tempo real:

```bash
docker-compose up
```

### 3. Verificar status

```bash
docker-compose ps
```

### 4. Ver logs

```bash
# Todos os serviços
docker-compose logs -f

# Apenas aplicação
docker-compose logs -f app

# Apenas banco de dados
docker-compose logs -f postgres
```

### 5. Parar containers

```bash
docker-compose down
```

Para remover volumes também ( apaga dados do banco):

```bash
docker-compose down -v
```

## Produção

### 1. Configurar variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.production.example .env
```

** IMPORTANTE**: Altere as credenciais do banco de dados no arquivo `.env`!

### 2. Build e iniciar

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. Verificar status

```bash
docker-compose -f docker-compose.prod.yml ps
```

### 4. Ver logs

```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### 5. Parar

```bash
docker-compose -f docker-compose.prod.yml down
```

## Comandos Úteis

### Acessar banco de dados

```bash
# Desenvolvimento
docker-compose exec postgres psql -U postgres-design-furniture -d design_furniture_dev

# Produção
docker-compose -f docker-compose.prod.yml exec postgres psql -U ${DB_USERNAME} -d ${DB_DATABASE}
```

### Executar comandos na aplicação

```bash
# Desenvolvimento
docker-compose exec app npm run <comando>

# Produção
docker-compose -f docker-compose.prod.yml exec app node dist/main.js
```

### Rebuild da aplicação

```bash
# Desenvolvimento
docker-compose build app
docker-compose up -d app

# Produção
docker-compose -f docker-compose.prod.yml build app
docker-compose -f docker-compose.prod.yml up -d app
```

### Limpar tudo

```bash
# Parar e remover containers, volumes e imagens
docker-compose down -v --rmi all
```

## Estrutura dos Arquivos Docker

### Dockerfile

- **Multi-stage build** para otimização
- Imagem de produção otimizada
- Usuário não-root para segurança

### Dockerfile.dev

- Configurado para desenvolvimento
- Hot-reload habilitado
- Todas as dependências incluídas

### docker-compose.yml

- Configuração para desenvolvimento
- Hot-reload de código
- Banco de dados com dados persistentes
- Logs detalhados

### docker-compose.prod.yml

- Configuração para produção
- Otimizações de performance
- Health checks
- Limites de recursos
- Sem sincronização automática do banco

## Backup do Banco de Dados

### Criar backup

```bash
docker-compose exec postgres pg_dump -U postgres-design-furniture design_furniture_dev > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar backup

```bash
docker-compose exec -T postgres psql -U postgres-design-furniture design_furniture_dev < backup.sql
```

## Troubleshooting

### Porta já em uso

Se a porta 3000 ou 5433 estiver em uso, altere no `docker-compose.yml`:

```yaml
ports:
  - '3001:3000' # Mude 3000 para outra porta
```

### Erro de conexão com banco

1. Verifique se o container do banco está rodando:

```bash
docker-compose ps
```

2. Verifique os logs:

```bash
docker-compose logs postgres
```

3. Aguarde o health check passar (pode levar alguns segundos)

### Rebuild completo

Se houver problemas, faça um rebuild completo:

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## Monitoramento

### Ver uso de recursos

```bash
docker stats
```

### Health checks

Os containers têm health checks configurados. Verifique o status:

```bash
docker-compose ps
```

## Segurança em Produção

1. **Altere todas as senhas** no arquivo `.env`
2. **Use secrets** do Docker Swarm ou Kubernetes em produção real
3. **Configure firewall** para proteger as portas
4. **Use SSL/TLS** para conexões com o banco
5. **Desabilite DB_SYNCHRONIZE** em produção (use migrations)

## Deploy

### Build da imagem

```bash
docker build -t design-furniture-backend:latest .
```

### Push para registry

```bash
docker tag design-furniture-backend:latest your-registry/design-furniture-backend:latest
docker push your-registry/design-furniture-backend:latest
```
