#  AI Blog Platform

An **AI-powered full-stack blogging platform** built using the **MERN stack**, featuring **admin moderation**, **JWT authentication**, **image uploads**, **comment approval**, and **AI-assisted blog content generation using Google Gemini**.

This project is designed to be **production-ready**, **scalable**, and **developer-friendly**, with a clean admin dashboard and a modern user-facing blog experience.

---

##  Features

###  Blog Management

* Create, edit, delete, publish/unpublish blogs
* Rich text editor (Quill) with image support
* Category-based blog filtering
* Draft & publish workflow

###  AI Content Generation

* Generate blog content using **Google Gemini AI**
* One-click AI content insertion into editor
* Markdown → HTML rendering

###  Comments System

* Users can add comments on blogs
* Admin approval system for comments
* Admin can delete or approve comments

###  Admin & Security

* Admin login using JWT authentication
* Protected admin routes
* Secure API access via middleware

###  Admin Dashboard

* Blog, comment, and draft statistics
* Recent blogs overview
* Centralized moderation panel

###  Frontend Experience

* Responsive UI with Tailwind CSS
* Blog search and category filters
* Optimized image delivery (ImageKit)

---

## 📁 Project Structure

```
AI Blog Platform/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vercel.json
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   └── vercel.json
│
├── CONTRIBUTING.md
├── LICENSE.md
└── README.md
```

---

##  Technologies Used

### Frontend

* **React (Vite)**
* **React Router**
* **Tailwind CSS**
* **Axios**
* **Quill Editor**
* **Marked (Markdown Parser)**
* **Motion**
* **Moment.js**
* **React Hot Toast**

### Backend

* **Node.js**
* **Express**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **Multer (File Uploads)**
* **ImageKit (Image Hosting)**
* **Google Gemini AI (`@google/genai`)**

### Deployment

* **Vercel** (Client & Server)

---

##  Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-blog-platform.git
cd ai-blog-platform
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` using `.env.example`:

```bash
cp .env.example .env
```

Fill in required values:

* MongoDB URI
* Admin credentials
* JWT secret
* ImageKit keys
* Gemini API key

Start the server:

```bash
npm run server
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
```

Create `.env` using `.env.example`:

```bash
cp .env.example .env
```

Run frontend:

```bash
npm run dev
```

---

##  Demo (Live Link)

* **Demo:** *https://quick-blog-platform.vercel.app*

---

## 📄 License

This project is licensed under the terms defined in the
👉 **[LICENSE.md](./LICENSE.md)** file.

---

## 🤝 Contributing

Contributions are welcome!
Please read the guidelines before contributing:

👉 **[CONTRIBUTING.md](./CONTRIBUTING.md)**

---

##  Author

**Laxman Goud**
Full-Stack Developer | MERN | AI-Powered Applications
