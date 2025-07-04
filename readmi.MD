# Fitness App Backend

Backend do projeto **Fitness App** desenvolvido com NestJS, Prisma ORM e TypeScript.

---

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **Prisma ORM**
- **Docker & Docker Compose**
- **PostgreSQL**

---

## Arquitetura e Decisões Técnicas

Este backend foi projetado seguindo **princípios SOLID** e boas práticas de arquitetura em aplicações NestJS:

- **Repository Pattern:**  
  Cada entidade do domínio possui seu próprio repositório, isolando a lógica de acesso ao banco de dados, facilitando testes e manutenção.

- **Separação por Módulos:**  
  Toda funcionalidade foi modularizada. Por exemplo, a feature de exercícios fica na pasta:
/src/exercises
- controllers/
- services/
- dtos/
- module.ts

markdown
Copy
Edit
Isso garante **baixo acoplamento** e **alta coesão**, facilitando a escalabilidade.

- **DTOs (Data Transfer Objects):**  
Toda entrada e saída de dados é validada e tipada via DTOs, aumentando a previsibilidade e segurança dos dados.  
A integração com a OpenAI também foi feita usando DTOs para garantir contratos de dados claros.

- **Princípios SOLID aplicados:**
- **S** (Single Responsibility): cada classe ou arquivo tem apenas uma responsabilidade.
- **O** (Open/Closed): módulos são abertos para extensão e fechados para modificação.
- **L** (Liskov Substitution): dependências podem ser trocadas por subclasses.
- **I** (Interface Segregation): interfaces pequenas e específicas.
- **D** (Dependency Inversion): inversão de dependências, injeção de dependências no NestJS.

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/getting-started/install) ou npm

---

## Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Fabiano-Bragaaa/fitness-app-backend.git
cd fitness-app-backend
2️⃣ Configurar variáveis de ambiente
Crie o arquivo .env na raiz:

dotenv
Copy
Edit
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/fitnessdb?schema=public
JWT_SECRET=seuSegredoAqui
PORT=3333
3️⃣ Subir o banco com Docker
Se usar Docker para o PostgreSQL, execute:

bash
Copy
Edit
docker-compose up -d
4️⃣ Instalar dependências
bash
Copy
Edit
yarn install
# ou
npm install
5️⃣ Rodar as migrations Prisma
bash
Copy
Edit
npx prisma migrate deploy
# ou
npx prisma migrate dev
6️⃣ Rodar o servidor
bash
Copy
Edit
yarn start:dev
# ou
npm run start:dev
Servidor rodando em:

arduino
Copy
Edit
http://localhost:3333
Comandos úteis
Gerar Prisma Client:

bash
Copy
Edit
npx prisma generate
Abrir Prisma Studio:

bash
Copy
Edit
npx prisma studio
Estrutura do Projeto
bash
Copy
Edit
/src
  /auth
  /exercises
      controllers/
      services/
      dtos/
      module.ts
  /users
  /common
  ...
Cada módulo contém:

Controllers: definem endpoints REST.

Services: encapsulam regras de negócio.

DTOs: validam e tipam dados.

Repositories: abstraem o acesso ao banco via Prisma.

Rodando tudo com Docker (Backend + Banco)
Caso tenha docker-compose.yml configurado com app + banco:

bash
Copy
Edit
docker-compose up --build
Observações
Projeto pensado para escalabilidade, testabilidade e baixa dependência entre módulos.

Baseado em Domain-Driven Design (DDD) simplificado, com cada módulo representando um subdomínio.