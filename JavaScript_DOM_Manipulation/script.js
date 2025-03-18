// เลือก Elements
const form = document.querySelector("form");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const todoList = document.getElementById("todoList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText.length > 0) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
  }
}

// แสดงรายการ Todo
function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) {
      li.classList.add("completed");
    }
    
    li.innerHTML = `
      <div class="task-actions">
        <span>${task.text}</span>
        <button class="toggle" data-id="${task.id}">${task.completed ? "↩️" : "✓"}</button>
        <button class="delete" data-id="${task.id}">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// จัดการการคลิกที่ปุ่ม ✓ หรือ ↩️
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle")) {
    const taskId = Number(event.target.getAttribute("data-id"));
    tasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }
  
  if (event.target.classList.contains("delete")) {
    const taskId = Number(event.target.getAttribute("data-id"));
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
  }
});

// ลบรายการที่เสร็จแล้ว
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
});

// ลบทั้งหมด
clearAllBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

renderTasks();
