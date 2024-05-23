document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const clearListButton = document.getElementById("clearListButton");
  const noTasksMessage = document.getElementById("noTasksMessage");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updateUI = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.text}</span>
        <input type="checkbox" ${
          task.completed ? "checked" : ""
        } data-index="${index}">
      `;
      taskList.appendChild(li);
    });

    noTasksMessage.style.display = tasks.length === 0 ? "block" : "none";
    clearListButton.disabled = tasks.length === 0;
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      saveTasks();
      updateUI();
    }
  });

  taskList.addEventListener("change", (event) => {
    if (event.target.tagName === "INPUT") {
      const index = event.target.getAttribute("data-index");
      tasks[index].completed = event.target.checked;
      saveTasks();
      updateUI();
    }
  });

  clearListButton.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    updateUI();
  });

  updateUI();
});
