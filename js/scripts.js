//EJERCICIO OBJETOS

function Persona(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
}

Persona.prototype.mostrarInfo = function() {
    return `Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}`;
}

var personas = [];

function registrarDatos() {
    var nombre = prompt("Ingrese su nombre:");
    var apellido = prompt("Ingrese su apellido:");
    var edad = prompt("Ingrese su edad:");

    var persona = new Persona(nombre, apellido, edad);
    personas.push(persona);
}

function mostrarDatos() {
    var resultadoHTML = "<h2>Información Registrada:</h2><ul>";

    for (var i = 0; i < personas.length; i++) {
        resultadoHTML += "<li>" + personas[i].mostrarInfo() + "</li>";
    }

    resultadoHTML += "</ul>";
    document.getElementById("resultado").innerHTML = resultadoHTML;
}

document.getElementById("registrarBtn").addEventListener("click", registrarDatos);
document.getElementById("mostrarBtn").addEventListener("click", mostrarDatos);

//TO DO LIST 3

const taskInput = document.getElementById("taskInput");
const filterInput = document.getElementById("filterInput");
const taskList = document.getElementById("taskList");
const taskTemplate = document.getElementById("taskTemplate");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, ingresa una tarea válida.");
        return;
    }

    const existingTask = Array.from(taskList.children).find(function (taskItem) {
        return taskItem.querySelector('.taskText').textContent.toLowerCase() === taskText.toLowerCase();
    });

    if (existingTask) {
        alert("Esta tarea ya está en la lista.");
        return;
    }

    const taskItem = document.importNode(taskTemplate.content, true);
    const doneCheckbox = taskItem.querySelector(".doneCheckbox");
    const taskTextElement = taskItem.querySelector(".taskText");

    taskTextElement.textContent = taskText;

    taskList.appendChild(taskItem);
    taskInput.value = "";
}

function filterTasks() {
    const filterText = filterInput.value.toLowerCase();

    Array.from(taskList.children).forEach(function (taskItem) {
        const taskText = taskItem.querySelector('.taskText').textContent.toLowerCase();
        const deleteButton = taskItem.querySelector(".deleteButton");
        const taskMatchesFilter = taskText.includes(filterText);
        taskItem.style.display = taskMatchesFilter ? "block" : "none";
    });
}

function toggleTaskStatus(checkbox) {
    const taskItem = checkbox.closest('li');
    const taskTextElement = taskItem.querySelector(".taskText");
    taskItem.classList.toggle("done", checkbox.checked);

    if (checkbox.checked) {
        taskTextElement.style.textDecoration = "line-through";
        taskTextElement.style.color = "blue";
    } else {
        taskTextElement.style.textDecoration = "none";
        taskTextElement.style.color = "";
    }

    const deleteButton = taskItem.querySelector(".deleteButton");

    if (checkbox.checked) {
        if (deleteButton) {
            deleteButton.style.display = "block";
        }
    } else {
        if (deleteButton) {
            deleteButton.style.display = "none";
        }
    }
}

function deleteTask(button) {
    const taskItem = button.closest('li');
    taskList.removeChild(taskItem);
}