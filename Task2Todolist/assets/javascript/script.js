const addItemButton = document.getElementById("add");
const removeItemButton = document.getElementById("remove");
const moveToRightButton = document.getElementById("moveToRight");
const moveToLeftButton = document.getElementById("moveToLeft");

const itemInput = document.getElementById("item");
const toDoList = document.getElementById("toDoList");
const completeList = document.getElementById("completeList");
const toaster = document.getElementById("toaster");

/* Utility Functions */

// Show a toast message for user feedback
function showToast(message) {
  toaster.textContent = message;
  setTimeout(() => {
    toaster.textContent = "";
  }, 2000);
}

// Check if an item already exists in either the To-Do List or Completed List
function itemExistsInBothLists(itemName) {
  const allItems = [...toDoList.children, ...completeList.children];
  return allItems.some(item => item.textContent === itemName);
}

// Create a new list item with toggle selection behavior
function createListItem(itemName) {
  const listItem = document.createElement("li");
  listItem.textContent = itemName;
  listItem.addEventListener("click", () => {
    listItem.classList.toggle("selected");
  });
  return listItem;
}

/* List Management Functions */

// Add item to To-Do List
function addItem() {
  const itemName = itemInput.value.trim();
  if (!itemName) {
    showToast("Item name cannot be empty!");
    return;
  }
  if (itemExistsInBothLists(itemName)) {
    showToast("Duplicate item!");
    return;
  }
  const listItem = createListItem(itemName);
  toDoList.appendChild(listItem);
  itemInput.value = "";
}

// Remove selected items from both To-Do and Completed Lists
function removeItem() {
  const selectedToDoItems = toDoList.querySelectorAll(".selected");
  const selectedCompleteItems = completeList.querySelectorAll(".selected");

  if (selectedToDoItems.length === 0 && selectedCompleteItems.length === 0) {
    showToast("No items selected for removal!");
    return;
  }

  selectedToDoItems.forEach(item => toDoList.removeChild(item));
  selectedCompleteItems.forEach(item => completeList.removeChild(item));
}

// Move selected items between lists (To-Do List ↔ Completed List)
function moveItems(fromList, toList) {
  const selectedItems = fromList.querySelectorAll(".selected");
  if (selectedItems.length === 0) {
    showToast("wrong item selected");
    return;
  }
  selectedItems.forEach(item => {
    item.classList.remove("selected");
    toList.appendChild(item);
  });
}

/* Button Behavior Functions */

// Move selected items to Completed List
function moveToCompleted() {
  moveItems(toDoList, completeList);
}

// Move selected items to To-Do List
function moveToToDo() {
  moveItems(completeList, toDoList);
}

/* Dynamic Button Label Updates */

// Update button labels based on screen size
function updateButtonLabels() {
  if (window.innerWidth <= 768) {
    moveToRightButton.innerHTML = "<p>MOVE UP</p>";
    moveToLeftButton.innerHTML = "<p>MOVE DOWN</p>";
    moveToRightButton.removeEventListener("click", moveToCompleted); // Remove previous listener
    moveToLeftButton.removeEventListener("click", moveToToDo);
    moveToRightButton.addEventListener("click", moveToToDo); // Add listener for small screens
    moveToLeftButton.addEventListener("click", moveToCompleted);
  } else {
    moveToRightButton.innerHTML = "<p>MOVE TO RIGHT</p>";
    moveToLeftButton.innerHTML = "<p>MOVE TO LEFT</p>";
    moveToRightButton.removeEventListener("click", moveToToDo); // Remove previous listener
    moveToLeftButton.removeEventListener("click", moveToCompleted);
    moveToRightButton.addEventListener("click", moveToCompleted); // Revert for large screens
    moveToLeftButton.addEventListener("click", moveToToDo);
  }
}

/* Event Listeners */

// Add item button click handler
addItemButton.addEventListener("click", addItem);

// Remove item button click handler
removeItemButton.addEventListener("click", removeItem);

// Move selected items to Completed List (Move Down) for larger screens
moveToRightButton.addEventListener("click", moveToCompleted);

// Move selected items to To-Do List (Move Up) for larger screens
moveToLeftButton.addEventListener("click", moveToToDo);

// Update button labels on page load and window resize
window.addEventListener("load", updateButtonLabels);
window.addEventListener("resize", updateButtonLabels);
