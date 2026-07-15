const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Escribe una tarea antes de agregarla.");
        return;
    }

    const newTask = document.createElement("li");
    newTask.textContent = taskText;

    taskList.appendChild(newTask);

    taskInput.value = "";
    taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});