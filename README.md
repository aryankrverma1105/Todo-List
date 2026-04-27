# 🚀 Taskr — Full Stack Todo App

✨ A modern and minimal **Full Stack Todo Application** to manage your daily tasks efficiently.

---

## 🎯 Tech Stack

* 🟢 **Node.js + Express** (Backend)
* 🎨 **HTML, CSS, JavaScript** (Frontend)

---

## ✨ Features

* 📝 Create, Read, Update, Delete (CRUD) tasks
* ✅ Mark tasks as complete/incomplete
* 🎯 Set priority (Low / Medium / High)
* 🔍 Live search tasks
* 📂 Filter (All / Active / Completed)
* 🎨 Clean and responsive UI

---

## 📁 Project Structure

```id="u3d6yb"
todo-full-stack/
│
├── server.js          # 🚀 Backend (Express Server)
├── package.json       # 📦 Dependencies & scripts
└── public/
    ├── index.html     # 🌐 UI structure
    ├── style.css      # 🎨 Styling
    └── app.js         # 🧠 Frontend logic
```

---

## ⚙️ Getting Started

### 1️⃣ Install dependencies

```bash id="9ojh77"
npm install
```

---

### 2️⃣ Start the server

```bash id="3r4yec"
npm start
```

---

### 3️⃣ Open in browser 🌐

```id="u2p1qf"
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| GET    | /api/todos     | 📥 Get all todos   |
| GET    | /api/todos/:id | 🔎 Get single todo |
| POST   | /api/todos     | ➕ Create todo      |
| PUT    | /api/todos/:id | ✏️ Update todo     |
| DELETE | /api/todos/:id | ❌ Delete todo      |

---

## 🧪 Example Request (POST)

```json id="4mq4eq"
{
  "title": "Complete assignment",
  "description": "Finish before deadline",
  "priority": "high"
}
```

---

## ⚠️ Important Note

⚡ Data is stored in **memory only**
🔁 Restarting the server will **reset all tasks**

---

## 🛠️ Future Improvements

* 🗄️ Add database (MongoDB / MySQL)
* 🔐 User authentication
* ☁️ Deployment (Render / Vercel)
* 📱 Mobile-friendly enhancements

---

## 👨‍💻 Author

**Aryan Kumar Verma**

---

## ⭐ Show Your Support

If you like this project:

⭐ Star this repo
🍴 Fork it
💡 Contribute

---

💙 Happy Coding!
