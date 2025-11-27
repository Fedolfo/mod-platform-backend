# 🚀 Guia de Desenvolvimento com Docker

## ⚡ Hot-Reload Automático

Com a configuração atual, **você NÃO precisa fazer build toda vez** que alterar o código!

### ✅ O que atualiza automaticamente (sem rebuild):

1. **Código TypeScript** (`src/**/*.ts`)
   - Qualquer alteração em controllers, services, entities, etc.
   - O NestJS watch mode detecta e recompila automaticamente
   - A aplicação reinicia sozinha

2. **Arquivos de configuração** (tsconfig.json, nest-cli.json)
   - Alterações são refletidas automaticamente

### 🔨 Quando você PRECISA fazer rebuild:

1. **Adicionar/remover dependências** (`package.json`)

   ```bash
   docker-compose build app
   # ou
   docker-compose up -d --build app
   ```

2. **Alterar Dockerfile.dev**

   ```bash
   docker-compose build app
   ```

3. **Primeira vez rodando** (ou após limpar volumes)
   ```bash
   docker-compose up -d --build
   ```

## 📋 Fluxo de Trabalho Recomendado

### Primeira vez:

```bash
# Build inicial
docker-compose up -d --build
```

### Desenvolvimento diário:

```bash
# Apenas iniciar (se já estiver buildado)
docker-compose up -d

# Desenvolver normalmente - mudanças no código são detectadas automaticamente!
# Edite arquivos em src/ e veja a mágica acontecer ✨
```

### Quando adicionar nova dependência:

```bash
# 1. Adicione no package.json localmente
npm install nova-dependencia

# 2. Rebuild do container
docker-compose build app

# 3. Reinicie
docker-compose up -d app
```

## 🔍 Como Verificar se Está Funcionando

### 1. Ver logs em tempo real:

```bash
docker-compose logs -f app
```

Você verá algo assim quando salvar um arquivo:

```
[Nest] 123  - 01/01/2024, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 123  - 01/01/2024, 10:00:01 AM     LOG [InstanceLoader] AppModule dependencies initialized
```

### 2. Testar mudança rápida:

1. Abra `src/app.controller.ts`
2. Altere a mensagem do `getHello()`
3. Salve o arquivo
4. Veja os logs: `docker-compose logs -f app`
5. A aplicação deve reiniciar automaticamente!

## 🎯 Comandos Úteis

### Iniciar (primeira vez ou após mudanças em dependências):

```bash
docker-compose up -d --build
```

### Iniciar (código já buildado):

```bash
docker-compose up -d
```

### Ver logs:

```bash
docker-compose logs -f app
```

### Rebuild apenas da app (após mudar package.json):

```bash
docker-compose build app
docker-compose up -d app
```

### Parar tudo:

```bash
docker-compose down
```

### Limpar tudo (volumes, containers, imagens):

```bash
docker-compose down -v --rmi all
```

## 🐛 Troubleshooting

### Hot-reload não está funcionando?

1. **Verifique se os volumes estão montados:**

   ```bash
   docker-compose exec app ls -la /app/src
   ```

2. **Verifique permissões:**

   ```bash
   docker-compose exec app ls -la /app
   ```

3. **Reinicie o container:**
   ```bash
   docker-compose restart app
   ```

### Mudanças não aparecem?

1. **Verifique se o arquivo foi salvo** (alguns editores precisam de Ctrl+S)
2. **Veja os logs** para erros de compilação:
   ```bash
   docker-compose logs -f app
   ```
3. **Force rebuild** se necessário:
   ```bash
   docker-compose up -d --build app
   ```

## 💡 Dicas

1. **Mantenha o terminal com logs aberto:**

   ```bash
   docker-compose logs -f app
   ```

   Assim você vê quando o hot-reload acontece!

2. **Use o script helper:**

   ```bash
   npm run docker:dev
   ```

   Ele já faz o build inicial se necessário.

3. **Cache do npm:**
   O Docker usa cache do npm, então reinstalar dependências é mais rápido.

## 📊 Resumo Visual

```
┌─────────────────────────────────────────┐
│  Mudança no código (src/**/*.ts)        │
│           ↓                              │
│  Volume montado detecta mudança          │
│           ↓                              │
│  NestJS watch mode recompila             │
│           ↓                              │
│  Aplicação reinicia automaticamente      │
│           ✅ SEM REBUILD NECESSÁRIO!     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Mudança no package.json                 │
│           ↓                              │
│  Precisa reinstalar dependências         │
│           ↓                              │
│  docker-compose build app                │
│           ✅ REBUILD NECESSÁRIO!         │
└─────────────────────────────────────────┘
```
