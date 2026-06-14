# Problem 5

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for PostgreSQL)

## Setup from scratch

```bash
cd src/problem5

# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start Postgres + run migrations + generate Prisma client
npm run setup

# 4. Start the API (also starts Postgres if not running)
npm run dev
```

Server runs at `http://localhost:3000` (see `APP_PORT` in `.env`).

## Scripts

| Command                  | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `npm run setup`          | Start Postgres, run migrations, generate Prisma client |
| `npm run dev`            | Start Postgres + run API with hot reload               |
| `npm run db:up`          | Start Postgres container only                          |
| `npm run prisma:migrate` | Create/apply migrations after schema changes           |
| `npm run typecheck`      | TypeScript type check                                  |

## API

Base path: `/resources`

| Method   | Path             | Description                            |
| -------- | ---------------- | -------------------------------------- |
| `POST`   | `/resources`     | Create a resource                      |
| `GET`    | `/resources`     | List resources (with optional filters) |
| `GET`    | `/resources/:id` | Get one resource                       |
| `PATCH`  | `/resources/:id` | Update a resource                      |
| `DELETE` | `/resources/:id` | Delete a resource                      |

**Status values:** `active`, `archived`

**List query params:** `status`, `name`, `limit`, `offset`

## Test with curl

Set a base URL (adjust port if needed):

```bash
BASE=http://localhost:3000
```

### 1. Create a resource

```bash
curl -s -X POST "$BASE/resources" \
  -H "Content-Type: application/json" \
  -d '{"name":"My first item","status":"active"}'
```

Save the `id` from the response:

```bash
ID="<paste-id-here>"
```

### 2. List all resources

```bash
curl -s "$BASE/resources"
```

### 3. List with filters

```bash
curl -s "$BASE/resources?status=active&name=first&limit=10&offset=0"
```

### 4. Get one resource

```bash
curl -s "$BASE/resources/$ID"
```

### 5. Update a resource (partial)

```bash
curl -s -X PATCH "$BASE/resources/$ID" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated name"}'
```

```bash
curl -s -X PATCH "$BASE/resources/$ID" \
  -H "Content-Type: application/json" \
  -d '{"status":"archived"}'
```

### 6. Delete a resource

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" -X DELETE "$BASE/resources/$ID"
```

Expected: `HTTP 204`

### Error cases

**Missing name (400):**

```bash
curl -s -X POST "$BASE/resources" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Not found (404):**

```bash
curl -s "$BASE/resources/00000000-0000-0000-0000-000000000000"
```

**Invalid status (400):**

```bash
curl -s -X POST "$BASE/resources" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bad status","status":"invalid"}'
```

## Reset database

```bash
docker compose down -v
npm run setup
```

## Project structure

```
src/
├── index.ts              # Entry point
├── app.ts                # Express app setup
├── controllers/          # HTTP layer
├── services/             # Business logic
├── repositories/         # Database access (Prisma)
├── routes/
├── middleware/
├── types/
├── errors/
└── db/
prisma/
└── schema.prisma         # Database schema
```
