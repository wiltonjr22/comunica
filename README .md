# Comunica.AI API

A robust device management API built with NestJS, Prisma, and PostgreSQL, following Clean Code and SOLID principles.

---

## 🛠️ Technologies

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) (testing)
- [Swagger](https://swagger.io/) (API documentation)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/seu-usuario/comunicados-api.git
cd comunicados-api

# Copy the envs
cp .env.example .env
```
### 2. Run with Docker

```bash
docker-compose up --build
```

- This will start the database, run migrations, and launch the API.
- To run migrations manually:
  ```bash
  docker-compose run --rm migrate
  ```

---

### 4. Access Swagger Documentation

After starting the app, visit:

```
http://localhost:3000/swagger
```

You can interact with all API endpoints here.

---

## 🧑‍💻 Project Patterns

### Clean Code

- Small, clear, and well-named methods.
- Clear separation of concerns: Controller, Service, Repository, DTOs, and Entities.
- Comments only where necessary.

### SOLID Principles

- **S**ingle Responsibility: Each class has one responsibility.
- **O**pen/Closed: Classes are open for extension, closed for modification.
- **L**iskov Substitution: Use of abstractions for repositories and services.
- **I**nterface Segregation: Small, specific interfaces.
- **D**ependency Inversion: Depend on abstractions, not concrete implementations.

---

## 🧪 Running Tests

Run unit tests with:

```bash
npm run test
```

- Tests cover controllers and services, using mocks for external dependencies.

---

# 📢 Comunicados API · NestJS + Prisma

API robusta e segura para gerenciamento de comunicados, construída com **NestJS**, **Prisma**, **Docker**, seguindo os princípios de **SOLID**, **Clean Architecture** e com integração a sistemas externos.

---

## 🧱 Visão Geral

- 🔐 Autenticação via JWT
- 🎯 Filtros avançados (com `between`) para consultas
- 📦 Integração fake com API externa
- 📑 Documentação via Swagger
- 🧪 Testes automatizados com Jest
- 📦 Rodando com Docker Compose
- 🧼 Padrões SOLID e Clean Code
- 🧰 Patterns: Factory, Repository, Interface Segregation

---

## 🚀 Tecnologias

- **NestJS** – framework principal
- **Prisma ORM** – acesso a banco de dados
- **PostgreSQL** – banco de dados relacional
- **Swagger** – documentação automática
- **JWT** – autenticação segura
- **Docker / Docker Compose** – ambiente containerizado
- **Jest** – testes automatizados

---

## 🧭 Estrutura do Projeto

```bash
📦 src/
│
├── contexts/                # Módulos principais da aplicação
│   ├── auth/                # JWT, guards, login
│   ├── communication/       # CRUD de comunicados
│   ├── fake-integration/    # Integração externa simulada
│   ├── user/                # Dados do usuário logado
│   ├── health/              # Health check
│   └── contexts.module.ts
│
├── resources/               # Recursos compartilhados
│   ├── database/            # Configuração do Prisma
│   ├── json-placeholder/    # Dados fake externos
│   ├── swagger/             # Setup da documentação Swagger
│   ├── errors-handler.ts    # Manipulação global de erros
│   └── resources.module.ts
│
├── app.module.ts
├── main.ts
│
📦 prisma/
│   ├── schema.prisma        # Modelo do banco
│   ├── migrations/          # Migrations geradas
│   └── seed.ts              # Popula base de dados

---

## 📋 Notes

- Follow the `.env.example` pattern for environment configuration.
- The project is ready for both production and development; just adjust `DATABASE_URL` as needed.
- For Clean Code and SOLID examples, check the service, repository, and controller files.

---