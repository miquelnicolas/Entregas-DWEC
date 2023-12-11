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

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, ingresa una tarea válida.");
        return;
    }
    const existingTask = Array.from(taskList.children).find(function (taskItem) {
        return taskItem.dataset.task.toLowerCase() === taskText.toLowerCase();
    });

    if (existingTask) {
        alert("Esta tarea ya está en la lista.");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.dataset.task = taskText;

    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.onchange = function () {
        toggleTaskStatus(taskItem, doneCheckbox.checked);
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";
    deleteButton.classList.add("delete");
    deleteButton.onclick = function () {
        taskList.removeChild(taskItem);
    };

    taskItem.appendChild(doneCheckbox);
    taskItem.appendChild(document.createTextNode(" "));
    taskItem.appendChild(document.createTextNode(taskText));
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = "";
}

function filterTasks() {
    const filterText = filterInput.value.toLowerCase();
    Array.from(taskList.children).forEach(function (taskItem) {
    const taskText = taskItem.innerText.toLowerCase();
    const deleteButton = taskItem.querySelector(".delete");
    const taskMatchesFilter = taskText.includes(filterText);
    taskItem.style.display = taskMatchesFilter ? "block" : "none";
    });
}

function toggleTaskStatus(taskItem, completed) {
    taskItem.classList.toggle("done", completed);
}