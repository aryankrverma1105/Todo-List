
const API = '/api/todos';

// State 
let todos = [];
let currentFilter = 'all';
let editingId = null;
let selectedPriority = 'medium';

// DOM refs 
const todoList      = document.getElementById('todoList');
const emptyState    = document.getElementById('emptyState');
const modalOverlay  = document.getElementById('modalOverlay');
const modalTitle    = document.getElementById('modalTitle');
const inputTitle    = document.getElementById('inputTitle');
const inputDesc     = document.getElementById('inputDesc');
const formError     = document.getElementById('formError');
const searchInput   = document.getElementById('searchInput');
const toast         = document.getElementById('toast');
const dateDisplay   = document.getElementById('date-display');

// Init 
document.addEventListener('DOMContentLoaded', () => {
  setDateDisplay();
  loadTodos();
  bindEvents();
});

function setDateDisplay() {
  const now = new Date();
  dateDisplay.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}

//  API Calls

async function loadTodos() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error('Failed to load');
    todos = await res.json();
    renderAll();
  } catch (err) {
    showToast('Could not connect to server');
    console.error(err);
  }
}

async function createTodo(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Create failed');
  }
  return res.json();
}

async function updateTodo(id, data) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Update failed');
  }
  return res.json();
}

async function deleteTodo(id) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
}

//  Render

function renderAll() {
  const query = searchInput.value.trim().toLowerCase();

  let filtered = todos.filter(t => {
    if (currentFilter === 'active'    && t.completed) return false;
    if (currentFilter === 'completed' && !t.completed) return false;
    if (query && !t.title.toLowerCase().includes(query) &&
        !t.description.toLowerCase().includes(query)) return false;
    return true;
  });

  todoList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    filtered.forEach(todo => todoList.appendChild(buildTodoEl(todo)));
  }

  updateCounts();
}

function buildTodoEl(todo) {
  const div = document.createElement('div');
  div.className = `todo-item priority-${todo.priority}${todo.completed ? ' completed' : ''}`;
  div.dataset.id = todo.id;

  const date = new Date(todo.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  });

  div.innerHTML = `
    <button class="todo-check ${todo.completed ? 'checked' : ''}" title="Toggle complete"></button>
    <div class="todo-body">
      <div class="todo-title">${escapeHtml(todo.title)}</div>
      ${todo.description ? `<div class="todo-desc">${escapeHtml(todo.description)}</div>` : ''}
      <div class="todo-meta">
        <span class="priority-badge ${todo.priority}">${todo.priority}</span>
        <span class="todo-date">${date}</span>
      </div>
    </div>
    <div class="todo-actions">
      <button class="action-btn edit" title="Edit">✎</button>
      <button class="action-btn delete" title="Delete">✕</button>
    </div>
  `;

  div.querySelector('.todo-check').addEventListener('click', () => toggleComplete(todo));
  div.querySelector('.action-btn.edit').addEventListener('click', () => openEditModal(todo));
  div.querySelector('.action-btn.delete').addEventListener('click', () => handleDelete(todo.id));

  return div;
}

function updateCounts() {
  document.getElementById('count-all').textContent       = todos.length;
  document.getElementById('count-active').textContent    = todos.filter(t => !t.completed).length;
  document.getElementById('count-completed').textContent = todos.filter(t => t.completed).length;
}

//  Actions

async function toggleComplete(todo) {
  try {
    const updated = await updateTodo(todo.id, { completed: !todo.completed });
    const idx = todos.findIndex(t => t.id === todo.id);
    todos[idx] = updated;
    renderAll();
  } catch (err) {
    showToast('Could not update task');
  }
}

async function handleDelete(id) {
  try {
    await deleteTodo(id);
    todos = todos.filter(t => t.id !== id);
    renderAll();
    showToast('Task deleted');
  } catch (err) {
    showToast('Could not delete task');
  }
}

async function handleSave() {
  const title = inputTitle.value.trim();
  const description = inputDesc.value.trim();
  const priority = selectedPriority;

  formError.textContent = '';

  if (!title) {
    formError.textContent = 'Please enter a title.';
    inputTitle.focus();
    return;
  }

  try {
    if (editingId) {
      const updated = await updateTodo(editingId, { title, description, priority });
      const idx = todos.findIndex(t => t.id === editingId);
      todos[idx] = updated;
      showToast('Task updated');
    } else {
      const created = await createTodo({ title, description, priority });
      todos.unshift(created);
      showToast('Task added');
    }
    closeModal();
    renderAll();
  } catch (err) {
    formError.textContent = err.message || 'Something went wrong';
  }
}

//  Modal

function openNewModal() {
  editingId = null;
  modalTitle.textContent = 'New Task';
  inputTitle.value = '';
  inputDesc.value = '';
  formError.textContent = '';
  setPriority('medium');
  modalOverlay.classList.add('open');
  inputTitle.focus();
}

function openEditModal(todo) {
  editingId = todo.id;
  modalTitle.textContent = 'Edit Task';
  inputTitle.value = todo.title;
  inputDesc.value = todo.description;
  formError.textContent = '';
  setPriority(todo.priority);
  modalOverlay.classList.add('open');
  inputTitle.focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  editingId = null;
}

function setPriority(value) {
  selectedPriority = value;
  document.querySelectorAll('.priority-option').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === value);
  });
}

//  Events

function bindEvents() {
  document.getElementById('openModalBtn').addEventListener('click', openNewModal);
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  document.getElementById('saveBtn').addEventListener('click', handleSave);

  // Close modal on overlay click
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  // ESC key closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    if (e.key === 'Enter' && modalOverlay.classList.contains('open')) handleSave();
  });

  // Priority picker inside modal
  document.querySelectorAll('.priority-option').forEach(btn => {
    btn.addEventListener('click', () => setPriority(btn.dataset.value));
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderAll();
    });
  });

  // Search
  searchInput.addEventListener('input', renderAll);
}

//  Utilities

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
