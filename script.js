document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');  // "Add Task" button
    const taskInput = document.getElementById('task-input');  // Input field for entering tasks
    const taskList = document.getElementById('task-list');    // Unordered list to display tasks

    // Step 2: Load tasks from Local Storage
    function loadTasks() {
        // Get tasks from Local Storage, if available
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Add each task to the DOM
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents re-saving to Local Storage
    }

    // Step 3: Create the addTask Function
    function addTask(taskText, save = true) {
        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Add a class for styling purposes

        // Assign an onclick event to remove the task when the button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove the task from Local Storage when it's deleted
        };

        // Append the remove button to the <li> element
        li.appendChild(removeButton);

        // Append the new task to the task list
        taskList.appendChild(li);

        // Step 4: Save task to Local Storage
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Step 5: Save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText); // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array to Local Storage
    }

    // Step 6: Remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array to Local Storage
    }

    // Step 7: Attach Event Listeners
    // Add an event listener to addButton to call addTask when the button is clicked
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
        } else {
            alert("Please enter a task.");
        }
    });

    // Add an event listener to the input field for the 'keypress' event (Enter key)
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
            } else {
                alert("Please enter a task.");
            }
        }
    });

    // Load the tasks when the page is loaded
    loadTasks();
});
