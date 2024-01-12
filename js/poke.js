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