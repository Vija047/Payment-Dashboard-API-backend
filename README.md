#  Payment Dashboard API — Backend (NestJS)

This is the **backend REST API** for the **Payment Management Dashboard**, built with **NestJS**.  
It provides secure, role-based endpoints for:
- Authentication
- Payment transactions
- Dashboard stats
- (Optional) User management
- (Optional) Real-time updates with WebSockets

---

##  **Key Features**

JWT-based login  
Payments CRUD with filters & pagination  
Dashboard metrics endpoint  
Optional role-based users module  
 Optional live updates with WebSockets + Redis  
Jest unit & e2e tests (optional)

---

##  **Tech Stack**

- **NestJS** (TypeScript)
- **JWT Auth** with Passport
- **PostgreSQL** (TypeORM) or **MongoDB** (Mongoose)
- **WebSockets** (optional)
- **Redis** (optional)

---

##  **Folder Structure**

src/
├── auth/
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ ├── jwt.strategy.ts
├── payments/
│ ├── payments.controller.ts
│ ├── payments.service.ts
│ ├── payment.entity.ts (or payment.schema.ts for Mongo)
├── users/ (optional)
│ ├── users.controller.ts
│ ├── users.service.ts
├── common/
│ ├── guards/jwt-auth.guard.ts
│ ├── decorators/user.decorator.ts

---

##  **Getting Started**

###  Clone the repo

```bash
git clone https://github.com/yourusername/payment-dashboard-backend.git
cd payment-dashboard-backend
```

 Install dependencies
```bash
npm install
```

 Create .env
Copy .env.example and fill in your config:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=payments_db

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=3600s
```
(Adjust for MongoDB if you prefer Mongoose)

 Run database (Postgres example)
```bash
# For PostgreSQL
# Make sure you have created the `payments_db` database
```
Or for MongoDB:

```bash
# Update Mongoose config in `app.module.ts`
```

 Start the server
```bash
npm run start:dev
```
The API runs on http://localhost:3000 by default.

---

##  API Endpoints

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| POST   | /auth/login         | Authenticate user, returns JWT     |
| GET    | /payments           | List payments (supports pagination, filters) |
| GET    | /payments/:id       | Get single payment details         |
| POST   | /payments           | Add a simulated payment            |
| GET    | /payments/stats     | Get key metrics for dashboard      |
| GET    | /users              | (Optional) List all users          |
| POST   | /users              | (Optional) Add new user            |

---

## Filters Supported

**GET /payments**

- `dateFrom` / `dateTo` → filter by date range
- `status` → success, failed, pending
- `method` → e.g., card, bank, UPI
- `page` & `limit` → pagination

Example:

```bash
GET /payments?status=success&dateFrom=2025-01-01&dateTo=2025-01-31&page=1&limit=20
```

---

## Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

---

##  Optional Tools

 Postman Collection: See /docs/PostmanCollection.json

Docker Compose: Add docker-compose.yml if needed

---

##  Sample User

| Username | Password |
|----------|----------|
| admin    | password |

(Either hardcoded or seeded in DB)

---

##  Bonus: Live Updates

You can add:

- WebSockets with @nestjs/websockets
- Redis Pub/Sub for scaling
- Emit payment events when new payments are created

---

##  CORS

Make sure CORS is enabled for your React Native frontend:

```ts
// main.ts
app.enableCors();
```

---

##  Deployment

Recommended:

- Deploy with Docker or PM2
- Use environment variables for secrets
- Use HTTPS in production

---

##  Author

Built with  by Your Name

---
##  License

MIT

---

##  Done!

For full stack:

Frontend: React Native App

Backend: NestJS API

---

##  **How to Use**

 Replace `yourusername` with your GitHub username  
 Add `.env.example` to your repo  
 Push `README.md` in your `server/` or `backend/` folder

If you’d like, I can:
Write you a **`.env.example`**  
Generate a **Postman Collection JSON template**  
 Or help with a **Docker Compose**

**Say “Yes, next!”** if you want me to generate those too 🚀
