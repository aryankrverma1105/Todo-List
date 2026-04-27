# Taskr — Full Stack Todo App

A simple but well-built todo app using **Express.js** (Node) on the back end and vanilla **HTML/CSS/JS** on the front end.

## Project Structure

```
todo-app/
├── server.js          ← Express API server
├── package.json
└── public/
    ├── index.html     ← Frontend markup
    ├── style.css      ← Styles
    └── app.js         ← Frontend logic + API calls
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

Then open **http://localhost:3000** in your browser.

---

## API Endpoints

| Method | Route              | Description        |
|--------|--------------------|--------------------|
| GET    | `/api/todos`       | Get all todos      |
| GET    | `/api/todos/:id`   | Get a single todo  |
| POST   | `/api/todos`       | Create a new todo  |
| PUT    | `/api/todos/:id`   | Update a todo      |
| DELETE | `/api/todos/:id`   | Delete a todo      |

### Example POST body

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium"
}
```

Priority values: `low`, `medium`, `high`

---

## Features

- Create, read, update, delete tasks
- Mark tasks as complete/incomplete
- Priority levels (low / medium / high)
- Filter by All / Active / Completed
- Live search
- Persistent in-memory store (swap with a DB to make it permanent)
