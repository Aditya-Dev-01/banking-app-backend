# Banking App Setup Guide

## Prerequisites
- Install **Docker**, **Node.js (v18)**, and optionally **Prisma CLI** (`npm install -g prisma`).
- (Optional) Use a PostgreSQL client like `pgAdmin` for database management.

---

## Configuration

### **.env File**
Add the following to your `.env`:
```
DATABASE_URL=postgresql://postgres:admin@123@postgres:5432/bank?schema=public
PORT=3000
```

### **Dockerfile**
Defines the app container:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["dockerize", "-wait", "tcp://postgres:5432", "-timeout", "60s", "npm", "run", "migrate-and-start"]
```

### **docker-compose.yml**
Defines multi-container setup:
```yaml
version: "3.8"
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin@123
      POSTGRES_DB: bank
    ports:
      - "5432:5432"

  app:
    build: .
    depends_on:
      - postgres
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:admin@123@postgres:5432/bank?schema=public
```

---

## Usage

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Start App**
   ```bash
   docker-compose up --build
   ```
   - App: `http://localhost:3000`
   - DB: `localhost:5432`

3. **Run Migrations and Seed** (Optional)
   ```bash
   docker exec -it bank-app npm run migrate
   docker exec -it bank-app npm run seed
   ```

4. **Access Logs**
   ```bash
   docker logs bank-app
   docker logs bank-postgres
   ```

---

## Troubleshooting

- **Database Issues**: Verify `DATABASE_URL` in `.env` matches credentials.
- **Build Errors**: Check for missing files like `package.json` or `.env`.
- **Prisma Errors**: Run `npm run generate` to regenerate Prisma client.

---

## Notes
- Use `docker-compose down` to stop services.
- Keep `.env` secure in production.

---

## References
- [Docker Docs](https://docs.docker.com/)
- [Prisma Docs](https://www.prisma.io/docs/)

