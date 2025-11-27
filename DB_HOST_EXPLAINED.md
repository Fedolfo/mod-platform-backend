# 🗄️ Entendendo DB_HOST no Docker

## ⚠️ O Problema com `localhost`

### ❌ Por que `localhost` NÃO funciona:

Quando você usa `DB_HOST: localhost` dentro de um container Docker:

```
┌─────────────────────────────────┐
│  Container: app                 │
│  DB_HOST: localhost             │
│  ↓                              │
│  Tenta conectar a si mesmo! ❌  │
│  (não encontra o PostgreSQL)    │
└─────────────────────────────────┘
```

**`localhost` dentro do container = o próprio container**, não outros containers!

## ✅ Solução: Usar o Nome do Serviço

### Como funciona:

Docker cria um **DNS interno** com os nomes dos serviços:

```
┌─────────────────────────────────┐
│  Container: app                │
│  DB_HOST: postgres             │
│  ↓                             │
│  Docker resolve "postgres"     │
│  para o IP do container        │
│  do PostgreSQL ✅              │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│  Container: postgres            │
│  Porta: 5432                     │
└─────────────────────────────────┘
```

## 📋 Configuração Correta

### docker-compose.yml:

```yaml
services:
  postgres:
    # ... configuração do PostgreSQL
    ports:
      - '5433:5432'  # Host:Container (você acessa do seu PC na 5433)
    networks:
      - design-furniture-network

  app:
    environment:
      DB_HOST: postgres      # ✅ Nome do serviço (não localhost!)
      DB_PORT: 5432          # ✅ Porta do container (sempre 5432)
    networks:
      - design-furniture-network
```

## 🎯 Quando Usar Cada Um

### 1. **Entre Containers** (Docker Compose):
```yaml
DB_HOST: postgres  # ✅ Nome do serviço
DB_PORT: 5432      # ✅ Porta do container
```

### 2. **Do Seu Computador** (fora do Docker):
```bash
# Acessar do seu terminal
psql -h localhost -p 5433 -U postgres-design-furniture
#                    ↑
#              Porta do HOST (5433)
```

### 3. **Aplicação rodando FORA do Docker**:
```typescript
DB_HOST: 'localhost'  // ✅ Seu computador
DB_PORT: 5433         // ✅ Porta do host
```

## 🔍 Teste Rápido

### Verificar se o DNS funciona:

```bash
# Entrar no container da aplicação
docker-compose exec app sh

# Testar resolução DNS
ping postgres
# ou
nslookup postgres
```

### Verificar conexão:

```bash
# Dentro do container app
docker-compose exec app sh
# Tentar conectar
nc -zv postgres 5432
```

## 🐛 Troubleshooting

### Erro: "Connection refused" ou "ECONNREFUSED"

**Causa:** Usando `localhost` em vez do nome do serviço

**Solução:**
```yaml
# ❌ ERRADO
DB_HOST: localhost

# ✅ CORRETO
DB_HOST: postgres
```

### Erro: "Host not found" ou "Name resolution failed"

**Causa:** Containers não estão na mesma rede

**Solução:** Verifique se ambos têm `networks: - design-furniture-network`

### Erro: "Connection timeout"

**Causa:** Porta errada ou serviço não está rodando

**Solução:**
- Use porta `5432` (porta do container)
- Verifique se o PostgreSQL está rodando: `docker-compose ps`

## 📊 Resumo Visual

```
┌──────────────────────────────────────────┐
│  SEU COMPUTADOR                          │
│  localhost:5433 → PostgreSQL             │
│  (porta do HOST)                         │
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│  DOCKER NETWORK                           │
│  app → postgres:5432                      │
│  (nome do serviço:porta do container)    │
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│  Container: postgres                      │
│  Porta interna: 5432                      │
└──────────────────────────────────────────┘
```

## 💡 Regra de Ouro

**Dentro do Docker Compose:**
- ✅ **Sempre use o nome do serviço** para comunicação entre containers
- ✅ **Sempre use a porta do container** (5432 para PostgreSQL)
- ❌ **Nunca use `localhost`** para comunicação entre containers

**Fora do Docker:**
- ✅ Use `localhost` e a porta do host (5433)

