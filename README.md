# 🔗 url-shortener-api

A RESTful URL shortener API built with **Node.js**, **Express**, and **MongoDB**. Supports user authentication with JWT, URL creation, redirection, and basic click analytics.

---

## 🚀 Live API
Base URL: https://url-shortener-api-dh4c.onrender.com

## 🚀 Features

- **User Auth** — Register and login with hashed passwords (bcrypt) and JWT-based session management
- **URL Shortening** — Generate unique short codes for any long URL
- **Redirect** — Visit the short URL and get redirected to the original
- **Analytics** — Track total click count per short URL
- **Protected Routes** — Only authenticated users can create and view their own URLs

---

## 🛠️ Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Runtime      | Node.js                     |
| Framework    | Express.js v5               |
| Database     | MongoDB + Mongoose           |
| Auth         | JSON Web Tokens (jsonwebtoken) |
| Passwords    | bcryptjs                    |
| Config       | dotenv                      |
| Dev Tool     | nodemon                     |

---

## 📁 Project Structure

```
url-shortener-api/
├── controllers/
│   ├── auth.controller.js      # signup, login logic
│   └── url.controller.js       # createShortUrl, redirectUrl, getMyUrls
├── middleware/
│   └── auth.middleware.js      # JWT verification
├── models/
│   ├── user.model.js
│   └── url.model.js
├── routes/
│   ├── auth.routes.js          # /api/auth
│   └── url.routes.js           # /api/url
├── app.js                      # Express app setup
├── server.js                   # Entry point
├── .env                        # Environment variables (not committed)
├── .env.example                # Sample env file
├── .gitignore
└── package.json
```

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/harshits56/url-shortener-api.git
cd url-shortener-api

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your own values

# 4. Start the development server
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory. See `.env.example` for reference:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ **Never commit your `.env` file.** It is excluded via `.gitignore`.

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint          | Auth Required | Description          |
|--------|-------------------|---------------|----------------------|
| POST   | `/api/auth/signup`| No            | Register a new user  |
| POST   | `/api/auth/login` | No            | Login and get a JWT  |

**Signup Request Body:**
```json
{
  "email": "harshit@example.com",
  "password": "yourpassword"
}
```

**Login Response:**
```json
{
  "token": "<jwt_token>"
}
```

---

### URL Routes — `/api/url`

| Method | Endpoint         | Auth Required | Description                          |
|--------|------------------|---------------|--------------------------------------|
| POST   | `/api/url/create`| ✅ Yes        | Create a new short URL               |
| GET    | `/api/url/my`    | ✅ Yes        | Get all URLs created by the user     |
| GET    | `/api/url/:code` | No            | Redirect to original URL             |

**Create Short URL Request Body:**
```json
{
  "originalUrl": "https://stackoverflow.com"
}
```

**Create Short URL Response:**
```json
{
  "_id": "69fd4e689a57f383e94a4aa4",
  "originalUrl": "https://stackoverflow.com",
  "shortCode": "1fc40ae9",
  "clicks": 0,
  "user": "69fd4dcd9a57f383e94a4aa3",
  "createdAt": "2026-05-08T02:46:00.958Z"
}
```

**Authorization Header (for protected routes):**
```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 Analytics

Each time a short URL is visited via `GET /api/url/:code`, the `clicks` counter on that URL document is incremented. You can view the click count for all your URLs via `GET /api/url/my`.

---

## 🧪 Testing with Postman

1. **Register** → `POST /api/auth/signup`
2. **Login** → `POST /api/auth/login` → copy the token
3. **Create URL** → `POST /api/url/create` with `Authorization: Bearer <token>`
4. **Redirect** → Open `GET /api/url/:shortCode` in browser or Postman
5. **View URLs** → `GET /api/url/my` with auth header

---

## 📝 Scripts

```bash
npm start       # Start the server (production)
npm run dev     # Start with nodemon (development)
```

---

## 🔮 Future Improvements

- [ ] Custom short codes chosen by user
- [ ] Expiry / TTL for short URLs
- [ ] Per-click analytics (timestamp, IP, device)
- [ ] Rate limiting per user
- [ ] Dashboard frontend

---

## 🧑‍💻 Author

**Harshit**  
Backend Developer — Node.js | Express | MongoDB | Docker  
[GitHub](https://github.com/harshits56)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
