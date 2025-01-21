// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');  // "Add Task" button
    const taskInput = document.getElementById('task-input');  // Input field for tasks
    const taskList = document.getElementById('task-list');  // Unordered list to display tasks
  
    // Function to add a task to the list
    function addTask() {
      // Retrieve and trim the input value
      const taskText = taskInput.value.trim();
  
      // Check if the input is not empty
      if (taskText !== "") {
        // Create a new list item
        const newTask = document.createElement('li');
        newTask.textContent = taskText;
  
        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
  
        // Assign an event listener to the remove button to remove the task
        removeButton.onclick = function () {
          taskList.removeChild(newTask);
        };
  
        // Append the remove button to the list item, then append the list item to the task list
        newTask.appendChild(removeButton);
        taskList.appendChild(newTask);
  
        // Clear the task input field after adding the task
        taskInput.value = "";
      } else {
        // If the task input is empty, alert the user
        alert("Please enter a task!");
      }
    }
  
    // Attach event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);
  
    // Allow adding a task by pressing the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  });
  