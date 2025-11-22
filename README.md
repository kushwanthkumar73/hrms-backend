

# ✅ **Backend README.md (paste inside /backend/README.md)**

```
# HRMS Backend (Node.js + Express + PostgreSQL + Sequelize)

A production-ready Human Resource Management backend supporting Authentication, Employees management, Teams assignment, and Activity Logs with audit tracking.

---

## 🚀 Features
- JWT Authentication (Login / Register Organization Admin)
- Employees CRUD
- Teams CRUD
- Assign & Unassign employees to multiple teams
- Activity/Audit logs for every action (create, update, delete, assign)
- Secure route protection with middleware
- PostgreSQL with Sequelize ORM
- CORS enabled for frontend access

---

## 🛠 Tech Stack
| Technology | Description |
|-----------|------------|
| Node.js | Runtime |
| Express.js | Server framework |
| PostgreSQL | Database |
| Sequelize ORM | Database modeling |
| JWT | Authentication |
| dotenv | Environment config |
| pgAdmin | DB GUI |

---

## 📂 Folder Structure
```

backend/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── config/
├── package.json
├── .env
└── README.md

```

---

## ⚙️ Environment Variables (`.env`)
```

PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=******
DB_NAME=hrms
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key

````

---

## 🛢 Database Setup
Run pgAdmin or psql:
```sql
CREATE DATABASE hrms;
````

---

## ▶️ Start Backend

```
npm install
npm run dev
```

You should see:

```
DB connection OK
Server running on port 5000
```

---

## 🧪 API Endpoints

### Auth

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register Organization |
| POST   | `/api/auth/login`    | Login                 |

### Employees

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | `/api/employees`        |
| POST   | `/api/employees`        |
| PUT    | `/api/employees/:id`    |
| DELETE | `/api/employees/:id`    |
| PUT    | `/api/employees/assign` |

### Teams

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/teams`     |
| POST   | `/api/teams`     |
| PUT    | `/api/teams/:id` |
| DELETE | `/api/teams/:id` |

### Logs

| Method | Endpoint    |
| ------ | ----------- |
| GET    | `/api/logs` |

---

## 🌍 Deployment

### Render Deployment

Create new → Web Service → Connect GitHub → Set Environment Variables from `.env`
Build command:

```
npm install
```

Start command:

```
npm start
```

---

## 📦 Final Output

Backend returns JSON APIs consumed by React frontend.

```
{
 "id": 1,
 "first_name": "Ram",
 "email": "ram@gmail.com",
 "Teams": [ { "id": 1, "name": "Developers" } ]
}
```

---

## 👨‍💻 Author

Built by **You (Kushwanth Kumar)**


```

---

