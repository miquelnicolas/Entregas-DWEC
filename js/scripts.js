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

//Pokeapi

let selectedCards = [];

function startGame() {
    const cardContainer = document.getElementById('card-container');
    const combatResult = document.getElementById('combat-result');
    const numberOfCards = parseInt(document.getElementById('numberOfCards').value);

    cardContainer.innerHTML = '';
    combatResult.innerHTML = '';

    for (let i = 0; i < numberOfCards; i++) {
        const pokemonId = Math.floor(Math.random() * 100) + 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch Pokemon with ID ${pokemonId}`);
                }
                return response.json();
            })
            .then(pokemonData => {
                const card = createPokemonCard(pokemonData);
                cardContainer.appendChild(card);
            })
            .catch(error => console.error(error));
    }
}

function createPokemonCard(pokemon) {
    const cardTemplate = document.getElementById('pokemon-card-template');
    const card = document.importNode(cardTemplate.content, true);

    card.querySelector('.pokemon-name').textContent = pokemon.name;
    card.querySelector('.pokemon-image').src = pokemon.sprites.front_default;
    card.querySelector('.pokemon-type').textContent = pokemon.types.map(type => type.type.name).join(', ');
    card.querySelector('.pokemon-attack').textContent = pokemon.stats[1].base_stat;
    card.querySelector('.pokemon-defense').textContent = pokemon.stats[2].base_stat;

    card.addEventListener('click', () => handleCardClick(card));

    return card;
}

function handleCardClick(card) {
    card.classList.toggle('selected');
    
    if (card.classList.contains('selected')) {
        selectedCards.push(card);
    } else {
        selectedCards = selectedCards.filter(selectedCard => selectedCard !== card);
    }

    if (selectedCards.length === 2) {
        handleCombat();
    }
}

function handleCombat() {
    const attacker = selectedCards[0];
    const defender = selectedCards[1];

    const attackerAttack = parseInt(attacker.querySelector('.pokemon-attack').textContent);
    const defenderDefense = parseInt(defender.querySelector('.pokemon-defense').textContent);

    let combatResultText = '';

    if (attackerAttack > defenderDefense) {
        combatResultText = `${attacker.querySelector('.pokemon-name').textContent} wins!`;
    } else if (attackerAttack < defenderDefense) {
        combatResultText = `${defender.querySelector('.pokemon-name').textContent} wins!`;
    } else {
        combatResultText = 'It\'s a tie!';
    }

    const resultItem = document.createElement('li');
    resultItem.textContent = combatResultText;

    document.getElementById('combat-actions').appendChild(resultItem);

    selectedCards.forEach(card => card.classList.remove('selected'));
    selectedCards = [];
}