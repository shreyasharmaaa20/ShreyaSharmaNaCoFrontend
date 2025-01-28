const addItemButton = document.getElementById("add");
const removeItemButton = document.getElementById("remove");
const moveToRightButton = document.getElementById("moveToRight"); // Becomes "Move Up" on small screens
const moveToLeftButton = document.getElementById("moveToLeft");  // Becomes "Move Down" on small screens

const itemInput = document.getElementById("item");
const toDoList = document.getElementById("toDoList");
const completeList = document.getElementById("completeList");
const toaster = document.getElementById("toaster");

function showToast(message) {
  toaster.textContent = message;
  setTimeout(() => {
    toaster.textContent = "";
  }, 2000);
}

// Helper to check if an item already exists in the list
function itemExists(list, itemName) {
  return Array.from(list.children).some((item) => item.textContent === itemName);
}

// Add item
addItemButton.addEventListener("click", () => {
  const itemName = itemInput.value.trim();
  if (itemName === "") {
    showToast("Item name cannot be empty!");
    return;
  }
  if (itemExists(toDoList, itemName)) {
    showToast("Duplicate items are not allowed!");
    return;
  }
  const listItem = document.createElement("li");
  listItem.textContent = itemName;

  // Add toggle selection behavior
  listItem.addEventListener("click", () => {
    listItem.classList.toggle("selected");
  });

  toDoList.appendChild(listItem);
  itemInput.value = "";
});

// Remove selected items
removeItemButton.addEventListener("click", () => {
  const selectedItems = toDoList.querySelectorAll(".selected");
  if (selectedItems.length === 0) {
    showToast("No items selected for removal!");
    return;
  }
  selectedItems.forEach((item) => toDoList.removeChild(item));
});

// Move selected items to Completed List (Move Down)
function moveDown() {
  const selectedItems = toDoList.querySelectorAll(".selected");
  if (selectedItems.length === 0) {
    showToast("No items selected to move to Completed List!");
    return;
  }
  selectedItems.forEach((item) => {
    item.classList.remove("selected");
    completeList.appendChild(item);
  });
}

// Move selected items to To-Do List (Move Up)
function moveUp() {
  const selectedItems = completeList.querySelectorAll(".selected");
  if (selectedItems.length === 0) {
    showToast("No items selected to move to To-Do List!");
    return;
  }
  selectedItems.forEach((item) => {
    item.classList.remove("selected");
    toDoList.appendChild(item);
  });
}

// Dynamic button label updates based on screen size
function updateButtonLabels() {
  if (window.innerWidth <= 768) {
    moveToRightButton.innerHTML = "<p>MOVE UP</p>";
    moveToLeftButton.innerHTML = "<p>MOVE DOWN</p>";
    moveToRightButton.removeEventListener("click", moveDown); // Ensure no duplicates
    moveToLeftButton.removeEventListener("click", moveUp);
    moveToRightButton.addEventListener("click", moveUp); // Reassign for small screens
    moveToLeftButton.addEventListener("click", moveDown);
  } else {
    moveToRightButton.innerHTML = "<p>MOVE TO RIGHT</p>";
    moveToLeftButton.innerHTML = "<p>MOVE TO LEFT</p>";
    moveToRightButton.removeEventListener("click", moveUp); // Revert to large screen behavior
    moveToLeftButton.removeEventListener("click", moveDown);
    moveToRightButton.addEventListener("click", moveDown);
    moveToLeftButton.addEventListener("click", moveUp);
  }
}

// Update button labels on page load and window resize
window.addEventListener("load", updateButtonLabels);
window.addEventListener("resize", updateButtonLabels);
