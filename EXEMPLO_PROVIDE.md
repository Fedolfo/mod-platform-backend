# Exemplo Prático: Uso de `provide` no NestJS

## ❌ Abordagem Atual (Redundante)

```typescript
@Module({
  providers: [
    ProductsService,                    // ✅ Injeção automática
    {
      provide: ProductsRepository,      // ❌ Redundante! Mesma classe
      useClass: ProductsRepository,     // ❌ Redundante!
    },
    {
      provide: ProductsService,         // ❌ Redundante! Mesma classe
      useClass: ProductsService,        // ❌ Redundante!
    },
  ],
})
```

**Problema**: Você está registrando a mesma classe duas vezes! O NestJS já faz isso automaticamente.

---

## ✅ Abordagem Correta: Opção 1 - Injeção Automática (Mais Simples)

Quando você injeta a classe concreta diretamente:

```typescript
@Module({
  providers: [
    ProductsService,      // ✅ Basta isso!
    ProductsRepository,  // ✅ Basta isso!
  ],
})
```

**No construtor:**
```typescript
@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,  // ✅ Funciona!
  ) {}
}
```

---

## ✅ Abordagem Correta: Opção 2 - Usando Tokens (Para Interfaces)

Quando você quer injetar uma **interface** em vez da classe concreta:

### Passo 1: Criar o token
```typescript
// constants/products.constants.ts
export const PRODUCTS_REPOSITORY_TOKEN = 'PRODUCTS_REPOSITORY';
export const PRODUCTS_SERVICE_TOKEN = 'PRODUCTS_SERVICE';
```

### Passo 2: Configurar no módulo
```typescript
@Module({
  providers: [
    ProductsRepository,  // Instância concreta (necessária)
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,  // Token (chave)
      useClass: ProductsRepository,        // Classe (valor)
    },
    ProductsService,
    {
      provide: PRODUCTS_SERVICE_TOKEN,
      useClass: ProductsService,
    },
  ],
})
```

### Passo 3: Usar no construtor com `@Inject()`
```typescript
@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_TOKEN)  // ✅ Usa o token
    private readonly productsRepository: IProductsRepository,  // ✅ Interface!
  ) {}
}
```

---

## 📊 Comparação Visual

| Situação | Abordagem | Código |
|----------|-----------|--------|
| **Injetar classe concreta** | Automática | `providers: [ProductsService]` |
| **Injetar interface** | Com token | `provide: TOKEN, useClass: Classe` |
| **Mock em testes** | Com token | `provide: TOKEN, useValue: mock` |

---

## 🎯 Quando Usar Cada Uma?

### Use Injeção Automática quando:
- ✅ Você injeta a classe concreta diretamente
- ✅ Não precisa trocar a implementação
- ✅ Código mais simples

```typescript
// Módulo
providers: [ProductsService, ProductsRepository]

// Service
constructor(private repo: ProductsRepository) {}  // Classe concreta
```

### Use `provide` com Token quando:
- ✅ Você quer injetar uma **interface**
- ✅ Precisa trocar implementação (testes, diferentes ambientes)
- ✅ Quer desacoplar o código

```typescript
// Módulo
providers: [
  {
    provide: PRODUCTS_REPOSITORY_TOKEN,
    useClass: ProductsRepository,
  }
]

// Service
constructor(
  @Inject(PRODUCTS_REPOSITORY_TOKEN)
  private repo: IProductsRepository  // Interface!
) {}
```

---

## 🔄 Fluxo de Injeção

```
1. Módulo registra: { provide: TOKEN, useClass: Classe }
   ↓
2. NestJS cria instância da Classe
   ↓
3. Quando encontra @Inject(TOKEN), injeta a instância
   ↓
4. Pronto para usar!
```

