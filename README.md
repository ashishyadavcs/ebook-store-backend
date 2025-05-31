# 📚 Ebook Store Backend

A robust and scalable backend API for an eBook store, built with **Node.js**, **Express.js**, and **MongoDB**. This application provides RESTful endpoints for managing books, users, and orders, and is designed to integrate seamlessly with the [ebook-store-frontend](https://github.com/ashishyadavcs/ebook-store-frontend).

🔗 **Live API**: [ebook-store-backend.vercel.app](https://ebook-store-backend.vercel.app)

---

## 🚀 Features

- 🔐 User Authentication: Secure login and registration using JWT.
- 📘 Book Management: CRUD operations for eBooks.
- 🛒 Order Processing: Manage user orders and purchases.
- 🔎 Search Functionality: Search for books by title or author.
- ⚙️ Middleware: Helmet and rate limiter for security and DDoS protection.
- ✅ Robust Error Handling for all API endpoints.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT](https://jwt.io/)
- **Security**: [Helmet](https://www.npmjs.com/package/helmet), [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```
├── src/
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── middleware/      # Custom middleware (auth, error handling, etc.)
│   └── utils/           # Utility functions
├── .env.example         # Environment variable examples
├── package.json         # Project metadata and scripts
└── vercel.json          # Vercel deployment configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ashishyadavcs/ebook-store-backend.git
cd ebook-store-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

- Create a `.env` file in the root directory.
- Copy the contents of `.env.example` into `.env` and set the appropriate values.

4. **Run the development server:**

```bash
npm run dev
```

Server will start on `http://localhost:5000` (or the port specified in `.env`).

---

## 📦 Deployment

Ready for deployment on platforms like [Vercel](https://vercel.com/) or [Heroku](https://www.heroku.com/).

### Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to complete the deployment.

---

## 🧑‍💻 Author

- **Ashish Yadav**
  - [LinkedIn](https://linkedin.com/in/ashishyadavcs)
  - [GitHub](https://github.com/ashishyadavcs)
  - 📫 ashishyadav.works@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
