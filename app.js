// Task list array
let tasks = [];

// Get necessary DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCountElement = document.querySelector('.task-count');
const allButton = document.getElementById('all-button');
const activeButton = document.getElementById('active-button');
const completedButton = document.getElementById('completed-button');
const clearButton = document.getElementById('clear-button');

// Function to add a task to the list
function addTask(description) {
  const task = {
    description: description,
    completed: false
  };
  tasks.push(task);
  renderTasks();
  saveTasks();
}

// Function to render the task list
function renderTasks() {
  // Clear the task list
  taskList.innerHTML = '';

  // Render each task
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.description;

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    // Add event listener to mark a task as completed
    taskItem.addEventListener('click', () => {
      toggleTaskCompletion(index);
    });

    // Add a button to remove a task
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'X';
    removeButton.addEventListener('click', () => {
      removeTask(index);
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
  });

  updateTaskCount();
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  saveTasks();
}

// Function to remove a task from the list
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

// Function to update the task count
function updateTaskCount() {
  const remainingTasks = tasks.filter(task => !task.completed).length;
  taskCountElement.textContent = `${remainingTasks} item(s) left`;
}

// Function to filter tasks based on status
function filterTasks(status) {
  switch (status) {
    case 'all':
      renderTasks();
      break;
    case 'active':
      const activeTasks = tasks.filter(task => !task.completed);
      renderFilteredTasks(activeTasks);
      break;
    case 'completed':
      const completedTasks = tasks.filter(task => task.completed);
      renderFilteredTasks(completedTasks);
      break;
  }
}

// Function to render filtered tasks
function renderFilteredTasks(filteredTasks) {
  taskList.innerHTML = '';

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.description;

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskItem.addEventListener('click', () => {
      toggleTaskCompletion(index);
    });

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'X';
    removeButton.addEventListener('click', () => {
      removeTask(index);
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
  });
}

// Function to clear completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
  saveTasks();
}

// Event listener for form submission
taskForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== '') {
    addTask(taskDescription);
    taskInput.value = '';
  }
});

// Event listeners for filter buttons
allButton.addEventListener('click', () => {
  filterTasks('all');
  toggleActiveButton(allButton);
});

activeButton.addEventListener('click', () => {
  filterTasks('active');
  toggleActiveButton(activeButton);
});

completedButton.addEventListener('click', () => {
  filterTasks('completed');
  toggleActiveButton(completedButton);
});

//
