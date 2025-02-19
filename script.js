document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput")
    const addTaskButton = document.getElementById("addTask")
    const taskList = document.getElementById("taskList")
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  
    function renderTasks() {
      taskList.innerHTML = ""
      tasks.forEach((task, index) => {
        const li = document.createElement("li")
        li.innerHTML = `
                  <span>${task}</span>
                  <div class="task-buttons">
                      <button class="edit-button" onclick="editTask(${index})">Edit</button>
                      <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
                  </div>
              `
        taskList.appendChild(li)
      })
      saveTasks()
    }
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  
    function addTask() {
      const newTask = taskInput.value.trim()
      if (newTask) {
        tasks.push(newTask)
        taskInput.value = ""
        renderTasks()
      }else {
        alert("Please enter a task")
    }
    }
  
    window.editTask = (index) => {
      const newTask = prompt("Edit task:", tasks[index])
      if (newTask !== null) {
        tasks[index] = newTask.trim()
        renderTasks()
      }
    }
  
    window.deleteTask = (index) => {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1)
        renderTasks()
      }
    }
  
    addTaskButton.addEventListener("click", addTask)
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask()
      }
    })
  
    renderTasks()
  })
  
  