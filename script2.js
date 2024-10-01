const input = document.getElementById("addTask");
const ul = document.querySelector(".tasks");

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    if (input.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: input.value,
        completed: false
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    input.value = "";
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    const btn1 = document.createElement("button");
    const span = document.createElement("span");
    const btn2 = document.createElement("button");

    li.classList.add("task");
    btn1.classList.add("btn-2");
    btn2.classList.add("btn-2");
    span.classList.add(task.completed ? "uncheck" : "check");

    btn1.innerHTML = '<i class="fa-solid fa-check"></i>';
    span.textContent = task.text;
    btn2.innerHTML = '<i class="fa-solid fa-trash"></i>';

    li.appendChild(btn1);
    li.appendChild(span);
    li.appendChild(btn2);
    ul.appendChild(li);

    // Adding event listeners
    btn1.addEventListener("click", (event) => {
        event.stopPropagation();
        taskStatus(span, btn1, task);
    });

    btn2.addEventListener("click", () => {
        deleteTask(li, task);
    });
}

function taskStatus(span, btn1, task) {
    task.completed = !task.completed; // Toggle the completed status
    span.classList.toggle("check");
    span.classList.toggle("uncheck");
    btn1.innerHTML = task.completed 
        ? '<i class="fa-solid fa-circle-xmark"></i>' 
        : '<i class="fa-solid fa-check"></i>';
    
    updateLocalStorage();
}

function deleteTask(li, task) {
    ul.removeChild(li);
    removeTaskFromLocalStorage(task);
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(li => {
        const span = li.querySelector("span");
        tasks.push({
            text: span.textContent,
            completed: span.classList.contains("uncheck")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskToRemove) {
    const tasks = getTasksFromLocalStorage().filter(task => task.text !== taskToRemove.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
