# Clean Architecture - Estrutura do Banco de Dados

## 📁 Estrutura Criada

```
src/
├── config/                    # Configurações globais
│   ├── config.module.ts      # Módulo de configuração (global)
│   └── config.service.ts     # Serviço para acessar variáveis de ambiente
│
├── database/                  # Configuração do banco de dados
│   ├── database.module.ts     # Módulo do banco (global)
│   ├── database.config.ts     # Factory de configuração do TypeORM
│   └── entities/
│       └── index.ts          # Exporta todas as entidades
│
└── modules/                   # Módulos de negócio
    └── products/
        └── entities/
            └── product.entity.ts
```

## 🎯 Benefícios da Nova Estrutura

### 1. **Separação de Responsabilidades**

- Configuração separada do código de negócio
- Banco de dados isolado em seu próprio módulo
- Fácil manutenção e escalabilidade

### 2. **Variáveis de Ambiente**

- Configuração via `.env`
- Diferentes ambientes (dev, test, prod)
- Segurança (credenciais não no código)

### 3. **Escalabilidade**

- Adicionar novas entidades: apenas atualizar `database/entities/index.ts`
- Trocar banco de dados: apenas mudar variáveis de ambiente
- Múltiplos bancos: fácil adicionar configurações

### 4. **Testabilidade**

- Fácil mockar configurações
- Testes isolados por ambiente

## 📝 Como Usar

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env

NODE_ENV=development
PORT=3000

DB_TYPE=postgres
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres-design-furniture
DB_PASSWORD=postgres123
DB_DATABASE=design_furniture_dev
DB_SYNCHRONIZE='true'
DB_LOGGING='true'
```

### 2. Adicionar Nova Entidade

Quando criar uma nova entidade:

1. Crie a entidade no módulo correspondente:

```typescript
// src/modules/categories/entities/category.entity.ts
@Entity('categories')
export class Category { ... }
```

2. Adicione ao index de entidades:

```typescript
// src/database/entities/index.ts
import { Category } from '../../modules/categories/entities/category.entity';

export const entities = [Product, Category];
export { Product, Category };
```

### 3. Trocar Banco de Dados

Para usar PostgreSQL:

```env
DB_TYPE=postgres
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres-design-furniture
DB_PASSWORD=postgres123
DB_DATABASE=design_furniture_dev
DB_SYNCHRONIZE='true'
DB_LOGGING='true'
```

## 🔄 Fluxo de Configuração

```
1. app.module.ts
   ↓
2. ConfigModule (carrega .env)
   ↓
3. DatabaseModule (configura TypeORM)
   ↓
4. ProductsModule (usa o banco)
```

## 📦 Módulos Globais

- **ConfigModule**: Disponibiliza `ConfigService` em todo o app
- **DatabaseModule**: Disponibiliza `TypeOrmModule` em todo o app

## 🚀 Próximos Passos

1. **Migrations**: Adicionar suporte a migrations do TypeORM
2. **Múltiplos Bancos**: Configurar conexões separadas se necessário
3. **Health Check**: Adicionar verificação de saúde do banco
4. **Connection Pooling**: Configurar pool de conexões para produção
