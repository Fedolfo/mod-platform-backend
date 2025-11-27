# Design Furniture Backend

Backend da aplicação Design Furniture construído com NestJS, TypeORM e PostgreSQL.

## 🚀 Início Rápido

### Desenvolvimento Local (sem Docker)

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.development.example .env

# Iniciar aplicação
npm run start:dev
```

### Desenvolvimento com Docker

```bash
# Usar script helper
npm run docker:dev

# Ou manualmente
docker-compose up -d
```

### Produção com Docker

```bash
# Configurar variáveis de ambiente
cp .env.production.example .env
# ⚠️ IMPORTANTE: Altere as credenciais no arquivo .env!

# Usar script helper
npm run docker:prod

# Ou manualmente
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📝 Scripts Disponíveis

### Desenvolvimento

- `npm run docker:dev` - Inicia ambiente de desenvolvimento
- `npm run docker:dev:up` - Inicia containers
- `npm run docker:dev:down` - Para containers
- `npm run docker:dev:logs` - Ver logs
- `npm run docker:dev:build` - Rebuild containers

### Produção

- `npm run docker:prod` - Inicia ambiente de produção
- `npm run docker:prod:up` - Inicia containers
- `npm run docker:prod:down` - Para containers
- `npm run docker:prod:logs` - Ver logs
- `npm run docker:prod:build` - Rebuild containers

## 📚 Documentação

- [DOCKER.md](./DOCKER.md) - Guia completo do Docker
- [CLEAN_ARCHITECTURE.md](./CLEAN_ARCHITECTURE.md) - Arquitetura do projeto
- [INJECAO_DEPENDENCIA.md](./INJECAO_DEPENDENCIA.md) - Guia de injeção de dependência

## 🏗️ Estrutura do Projeto

```
src/
├── config/              # Configurações globais
├── database/            # Configuração do banco de dados
└── modules/             # Módulos de negócio
    └── products/        # Módulo de produtos
```

## 🔗 Endpoints

- `GET /` - Hello World
- `GET /health` - Health check
- `GET /products` - Listar produtos
- `POST /products` - Criar produto
- `GET /products/:id` - Buscar produto
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados
- **Docker** - Containerização
- **TypeScript** - Linguagem

## 📄 Licença

UNLICENSED
