# Entendendo Portas no Docker Compose

## Problema Comum: Confusão entre Portas

### Erro Comum:

```yaml
ports:
  - '5433:5433' # ERRADO!
```

### Correto:

```yaml
ports:
  - '5433:5432' # HOST_PORT:CONTAINER_PORT
```

## Explicação

### Formato de Mapeamento de Portas:

```yaml
ports:
  - 'HOST_PORT:CONTAINER_PORT'
```

- **HOST_PORT**: Porta no seu computador (pode ser qualquer uma, ex: 5433)
- **CONTAINER_PORT**: Porta dentro do container (sempre a porta padrão do serviço)

### Exemplo: PostgreSQL

O PostgreSQL **sempre** roda na porta **5432** dentro do container, independente de qual porta você mapeia no host.

```yaml
postgres:
  ports:
    - '5433:5432' # Acessa do host na 5433, mas dentro do container é 5432
```

**Significado:**

- Do seu computador: `localhost:5433` → acessa o PostgreSQL
- Dentro da rede Docker: `postgres:5432` → acessa o PostgreSQL

## Comunicação entre Containers

### Dentro da Rede Docker:

Quando containers estão na mesma rede Docker, eles se comunicam usando:

- **Nome do serviço** (não `localhost`)
- **Porta do container** (não a porta do host)

```yaml
# docker-compose.yml
services:
  postgres:
    ports:
      - '5433:5432' # Host:Container

  app:
    environment:
      DB_HOST: postgres # Nome do serviço
      DB_PORT: 5432 # Porta do CONTAINER (não 5433!)
```

## Resumo Visual

```
┌─────────────────────────────────────────┐
│  SEU COMPUTADOR (Host)                   │
│  localhost:5433  →  PostgreSQL          │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  DOCKER NETWORK                          │
│  postgres:5432  →  PostgreSQL            │
│  (nome do serviço:porta do container)   │
└─────────────────────────────────────────┘
```

## Configuração Correta

### docker-compose.yml:

```yaml
services:
  postgres:
    ports:
      - '5433:5432' # Host:Container
    # PostgreSQL sempre roda na 5432 dentro do container

  app:
    environment:
      DB_HOST: postgres # Nome do serviço
      DB_PORT: 5432 # Porta do container (sempre 5432)
```

### Para acessar do seu computador:

```bash
# Use a porta do HOST
psql -h localhost -p 5433 -U postgres-design-furniture -d design_furniture_dev
```

### Para acessar de outro container:

```typescript
// Use a porta do CONTAINER
DB_HOST: 'postgres'; // Nome do serviço
DB_PORT: 5432; // Porta do container
```

## Troubleshooting

### Erro: "Connection refused" ou "ECONNREFUSED"

1. **Verifique se está usando a porta correta:**
   - Do host: use a porta mapeada (ex: 5433)
   - Entre containers: use a porta do container (ex: 5432)

2. **Verifique se os containers estão na mesma rede:**

   ```bash
   docker network inspect design-furniture-network
   ```

3. **Verifique se o serviço está rodando:**

   ```bash
   docker-compose ps
   ```

4. **Veja os logs:**
   ```bash
   docker-compose logs postgres
   docker-compose logs app
   ```

## Dica

**Regra de ouro:**

- **Mapeamento de portas** (`ports`): `HOST:CONTAINER`
- **Comunicação entre containers**: sempre use a **porta do container** (padrão do serviço)
- **Acesso do host**: use a **porta do host** (a primeira do mapeamento)
