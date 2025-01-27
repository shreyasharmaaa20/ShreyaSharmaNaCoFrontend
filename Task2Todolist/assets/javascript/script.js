const taskInput = document.getElementById("taskInput");
const addItem = document.getElementById("addItem");
const moveRight = document.getElementById("moveRight");
const moveLeft = document.getElementById("moveLeft");
const remove = document.getElementById("remove");
const todoList = document.querySelector("#todoList ul");
const completeList = document.querySelector("#completeList ul");

let selectedTask = null;

// Add item to the To-Do list
addItem.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;

  const li = document.createElement("li");
  li.textContent = taskInput.value;
  li.addEventListener("click", () => {
    selectTask(li);
  });
  todoList.appendChild(li);
  taskInput.value = "";
});

// Select a task
function selectTask(task) {
  if (selectedTask) selectedTask.style.backgroundColor = "";
  selectedTask = task;
  selectedTask.style.backgroundColor = "#f0f0f0";
}

// Move selected task to Complete List
moveRight.addEventListener("click", () => {
  if (selectedTask && todoList.contains(selectedTask)) {
    completeList.appendChild(selectedTask);
    selectedTask.style.backgroundColor = "";
    selectedTask = null;
  }
});

// Move selected task back to To-Do List
moveLeft.addEventListener("click", () => {
  if (selectedTask && completeList.contains(selectedTask)) {
    todoList.appendChild(selectedTask);
    selectedTask.style.backgroundColor = "";
    selectedTask = null;
  }
});

// Remove the selected task
remove.addEventListener("click", () => {
  if (selectedTask) {
    selectedTask.remove();
    selectedTask = null;
  }
});

// Dynamically update button text based on screen size
function updateButtonLabels() {
  if (window.innerWidth <= 600) {
    moveRight.textContent = "MOVE DOWN";
    moveLeft.textContent = "MOVE UP";
  } else {
    moveRight.textContent = "MOVE TO RIGHT ";
    moveLeft.textContent = " MOVE TO LEFT";
  }
}

// Initial update and add event listener for resizing
updateButtonLabels();
window.addEventListener("resize", updateButtonLabels);
