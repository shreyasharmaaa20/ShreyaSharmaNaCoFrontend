// Selecting DOM elements
const itemInput = document.getElementById('item');
const addButton = document.getElementById('add');
const removeButton = document.getElementById('remove');
const toDoListElement = document.getElementById('toDoList');
const completeListElement = document.getElementById('completeList');
const moveRightButton = document.getElementById('moveToRight');
const moveLeftButton = document.getElementById('moveToLeft');
const toasterElement = document.getElementById('toaster');

// Variables for Undo functionality
let lastRemovedItems = []; 
let toasterTimeout;

// Setting up event listeners for buttons
addButton.addEventListener('click', addItem);
removeButton.addEventListener('click', removeSelectedItems);
moveRightButton.addEventListener('click', moveToRight);
moveLeftButton.addEventListener('click', moveToLeft);

// Function to display a toaster notification
function showToast(message, undo = false) {
  clearTimeout(toasterTimeout); 

  toasterElement.innerHTML = message;
  if (undo) {
    const undoButton = document.createElement('button');
    undoButton.textContent = 'Undo';
    undoButton.addEventListener('click', undoLastAction);
    toasterElement.appendChild(undoButton);
  }

  toasterElement.style.display = 'block';
  toasterTimeout = setTimeout(() => {
    toasterElement.style.display = 'none';
  }, 5000); // Display for 5 seconds
}

// Function to add a new item to the To-Do List
function addItem() {
  const itemName = itemInput.value.trim();
  if (itemName === '') return showToast('Item name cannot be empty');

  if (isDuplicate(itemName, toDoListElement) || isDuplicate(itemName, completeListElement)) {
    return showToast('Item is a duplicate');
  }

  const li = document.createElement('li');
  li.textContent = itemName;
  li.addEventListener('click', () => toggleSelection(li));
  toDoListElement.appendChild(li);

  itemInput.value = '';
  showToast('Item added');
}

// Function to toggle selection state of a list item
function toggleSelection(item) {
  item.classList.toggle('selected');
}

// Function to move selected items from the To-Do List to the Complete List
function moveToRight() {
  const selectedItems = Array.from(toDoListElement.querySelectorAll('.selected'));
  if (selectedItems.length === 0) return showToast('No items selected');

  selectedItems.forEach(item => {
    item.classList.remove('selected');
    completeListElement.appendChild(item);
  });

  showToast('Items moved to complete list');
}

// Function to move selected items back from the Complete List to the To-Do List
function moveToLeft() {
  const selectedItems = Array.from(completeListElement.querySelectorAll('.selected'));
  if (selectedItems.length === 0) return showToast('No items selected');

  selectedItems.forEach(item => {
    item.classList.remove('selected');
    toDoListElement.appendChild(item);
  });

  showToast('Items moved to To-Do list');
}

// Function to undo the most recent removal action
function undoLastAction() {
  if (lastRemovedItems.length === 0) {
    return showToast('No action to undo');
  }

  lastRemovedItems.forEach(({ item, parent }) => {
    parent.appendChild(item);
  });

  lastRemovedItems = []; // Reset undo history
  showToast('Undo successful');
}

// Function to check if an item already exists in a given list
function isDuplicate(itemName, list) {
  return Array.from(list.children).some(item => item.textContent === itemName);
}

// Function to remove selected items from the lists
function removeSelectedItems() {
  const selectedItems = [
    ...toDoListElement.querySelectorAll('.selected'),
    ...completeListElement.querySelectorAll('.selected'),
  ];
  if (selectedItems.length === 0) return showToast('No items selected');

  // Store the removed items and their parent lists for possible undo
  lastRemovedItems = selectedItems.map(item => ({
    item,
    parent: item.parentNode,
  }));

  selectedItems.forEach(item => item.remove());

  showToast('Items removed', true);
}


  
