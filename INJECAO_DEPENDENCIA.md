# Guia de Injeção de Dependência no NestJS

## 1. Injeção Automática (Mais Simples)

Quando você coloca apenas a classe no array `providers`, o NestJS automaticamente cria uma instância e injeta onde necessário.

```typescript
@Module({
  providers: [
    ProductsService,        // NestJS cria automaticamente
    ProductsRepository,     // NestJS cria automaticamente
  ],
})
```

**Como usar no construtor:**
```typescript
@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository, // Injeção automática
  ) {}
}
```

---

## 2. Injeção com `provide` (Quando Precisa de Controle)

Use `provide` quando você precisa:
- Injetar uma **interface** em vez de uma classe concreta
- Usar um **token customizado** (string ou símbolo)
- Trocar a implementação facilmente (útil para testes)

### 2.1. Usando Token String (Recomendado para Interfaces)

```typescript
// constants/products.constants.ts
export const PRODUCTS_REPOSITORY_TOKEN = 'PRODUCTS_REPOSITORY';
export const PRODUCTS_SERVICE_TOKEN = 'PRODUCTS_SERVICE';

// products.module.ts
@Module({
  providers: [
    ProductsRepository,
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,  // Token (chave)
      useClass: ProductsRepository,         // Implementação (valor)
    },
    ProductsService,
    {
      provide: PRODUCTS_SERVICE_TOKEN,
      useClass: ProductsService,
    },
  ],
})
```

**Como usar no construtor:**
```typescript
@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_TOKEN)  // Usa o token
    private readonly productsRepository: IProductsRepository,  // Interface
  ) {}
}
```

---

## 3. Outras Opções de `provide`

### 3.1. `useClass` - Usa uma classe
```typescript
{
  provide: PRODUCTS_REPOSITORY_TOKEN,
  useClass: ProductsRepository,  // Cria nova instância
}
```

### 3.2. `useValue` - Usa um valor já criado
```typescript
const mockRepository = {
  create: () => {},
  save: () => {},
};

{
  provide: PRODUCTS_REPOSITORY_TOKEN,
  useValue: mockRepository,  // Usa o objeto diretamente
}
```

### 3.3. `useFactory` - Cria dinamicamente
```typescript
{
  provide: PRODUCTS_REPOSITORY_TOKEN,
  useFactory: (configService: ConfigService) => {
    // Lógica para criar o repositório
    return new ProductsRepository(configService.get('DB_URL'));
  },
  inject: [ConfigService],  // Dependências da factory
}
```

---

## 4. Quando Usar Cada Abordagem?

### Use Injeção Automática quando:
- Você está injetando a classe concreta diretamente
- Não precisa de flexibilidade para trocar implementações
- Código mais simples e direto

```typescript
// Simples e direto
providers: [ProductsService, ProductsRepository]

// No construtor
constructor(private productsRepository: ProductsRepository) {}
```

### Use `provide` com Token quando:
- Você quer injetar uma **interface** (abstração)
- Precisa trocar implementações facilmente (testes, diferentes ambientes)
- Quer desacoplar o código

```typescript
// Flexível e desacoplado
providers: [
  {
    provide: PRODUCTS_REPOSITORY_TOKEN,
    useClass: ProductsRepository,
  }
]

// No construtor
constructor(
  @Inject(PRODUCTS_REPOSITORY_TOKEN)
  private productsRepository: IProductsRepository
) {}
```

---

## 5. Exemplo Completo: Arquitetura com Interfaces

```typescript
// 1. Definir interface
export interface IProductsRepository {
  create(dto: CreateProductDto): Promise<Product>;
  findAll(): Promise<Product[]>;
}

// 2. Implementar a interface
@Injectable()
export class ProductsRepository implements IProductsRepository {
  // implementação...
}

// 3. Criar token
export const PRODUCTS_REPOSITORY_TOKEN = 'PRODUCTS_REPOSITORY';

// 4. Configurar no módulo
@Module({
  providers: [
    ProductsRepository,  // Instância concreta
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,  // Token para injeção
      useClass: ProductsRepository,        // Classe que implementa
    },
  ],
})

// 5. Usar no service
@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_TOKEN)
    private readonly repository: IProductsRepository,  // Interface!
  ) {}
}
```

---

## 6. Benefícios de Usar Tokens

1. **Testabilidade**: Fácil criar mocks
```typescript
// Em testes
const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
};

Test.createTestingModule({
  providers: [
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,
      useValue: mockRepository,  // Mock fácil!
    },
  ],
})
```

2. **Flexibilidade**: Trocar implementação sem mudar código
```typescript
// Em produção
useClass: ProductsRepository

// Em testes
useClass: MockProductsRepository

// Em desenvolvimento
useClass: InMemoryProductsRepository
```

3. **Desacoplamento**: Service não conhece a implementação concreta
```typescript
// Service só conhece a interface
private readonly repository: IProductsRepository  // ✅ Abstração
```

