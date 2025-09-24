# Backend

This is the backend codebase for the React Native Playground project. It provides APIs for managing projects, users, and interactions with the frontend. Built with Express.js and TypeScript, it ensures robust request handling, schema validation, and a clean architecture for scalability.

# 🛠 Tech Stack

- **Node.js (TypeScript)** — Backend server
- **Express.js** — REST API framework
- **Prisma ORM** — Database schema and queries
- **Zod** — Request validation
- **TypeScript** — Type safety
- **Nodemon** — Development server auto-reload

# ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/QUBITABHAY/react_native_playground_backend.git
cd react_native_playground_backend
```

### 2. Install dependencies

```bash
npm install
npm install --save-dev @types/express @types/node nodemon prisma ts-node typescript
```

### 3. Run the development server

```bash
npm run dev
```

The server will run at:

```
http://localhost:3000
```

---

## 🛠️ Features

- **TypeScript-powered backend** for improved developer experience
- **Prisma ORM integration** for database operations
- **Express.js REST API** for backend routes
- **Zod schema validation** for robust request handling
- **Hot reloading** with Nodemon during development

---

## 📌 Contributing

1. Fork this repository
2. Create a feature branch:

```bash
git checkout -b feature-name
```

1. Commit your changes:

```bash
git commit -m "Added feature"
```

1. Push to your fork:

```bash
git push origin feature-name
```

1. Open a Pull Request

---

✅ **Pro Tip:** Use `npm run dev` for development with live reload and `npm start` for production builds.