const taskInput = document.getElementById('taskInput');
const addItem = document.getElementById('addItem');
const todoList = document.getElementById('todoList');
const completeList = document.getElementById('completeList');
const moveToRight = document.getElementById('moveToRight');
const moveToLeft = document.getElementById('moveToLeft');
const removeItem = document.getElementById('removeItem');

function loadTasks() {
    const todoTasks = JSON.parse(localStorage.getItem('todoList')) || [];
    const completeTasks = JSON.parse(localStorage.getItem('completeList')) || [];

    todoTasks.forEach(task => addTaskToList(todoList, task));
    completeTasks.forEach(task => addTaskToList(completeList, task));
}

function saveTasks() {
    const todoTasks = Array.from(todoList.children).map(task => task.textContent);
    const completeTasks = Array.from(completeList.children).map(task => task.textContent);

    localStorage.setItem('todoList', JSON.stringify(todoTasks));
    localStorage.setItem('completeList', JSON.stringify(completeTasks));
}

function addTaskToList(list, taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('selected');
    });
    list.appendChild(taskItem);
}

addItem.addEventListener('click', () => {
    if (taskInput.value.trim()) {
        addTaskToList(todoList, taskInput.value.trim());
        saveTasks();
        taskInput.value = '';
    }
});

moveToRight.addEventListener('click', () => {
    const selectedTasks = Array.from(todoList.querySelectorAll('.selected'));
    selectedTasks.forEach(task => {
        task.classList.remove('selected');
        completeList.appendChild(task);
    });
    saveTasks();
});

moveToLeft.addEventListener('click', () => {
    const selectedTasks = Array.from(completeList.querySelectorAll('.selected'));
    selectedTasks.forEach(task => {
        task.classList.remove('selected');
        todoList.appendChild(task);
    });
    saveTasks();
});

removeItem.addEventListener('click', () => {
    const selectedTasks = Array.from(document.querySelectorAll('li.selected'));
    selectedTasks.forEach(task => task.remove());
    saveTasks();
});

document.addEventListener('DOMContentLoaded', loadTasks);
