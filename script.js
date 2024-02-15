document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Display tasks from local storage
    tasks.forEach(function(task) {
      addTaskToDOM(task);
    });
  
    // Add task
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskContent = taskInput.value.trim();
      if (taskContent !== '') {
        const task = {
          id: Date.now(),
          content: taskContent,
          completed: false
        };
        tasks.push(task);
        addTaskToDOM(task);
        updateLocalStorage();
        taskInput.value = '';
      }
    });
  
    // Delete task
    taskList.addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
        const taskId = parseInt(event.target.parentElement.dataset.taskId);
        tasks = tasks.filter(task => task.id !== taskId);
        event.target.parentElement.remove();
        updateLocalStorage();
      }
    });
  
    // Toggle task completion
    taskList.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
        const taskId = parseInt(event.target.dataset.taskId);
        const taskElement = event.target;
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        taskElement.classList.toggle('completed');
        updateLocalStorage();
      }
    });
  
    // Update local storage
    function updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Add task to DOM
    function addTaskToDOM(task) {
      const li = document.createElement('li');
      li.dataset.taskId = task.id;
      li.textContent = task.content;
      if (task.completed) {
        li.classList.add('completed');
      }
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    }
  });
  