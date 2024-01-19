let selectedCards = [];

function startGame() {
    const cardContainer = document.getElementById('card-container');
    const combatActions = document.getElementById('combat-actions');
    const numberOfCards = parseInt(document.getElementById('numberOfCards').value);

    cardContainer.innerHTML = '';
    combatActions.innerHTML = '';
    selectedCards = [];

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
    const card = document.createElement('div');

    card.classList.add('pokemon-card');
    card.innerHTML = cardTemplate.innerHTML;

    card.querySelector('.pokemon-name').textContent = pokemon.name;
    card.querySelector('.pokemon-image').src = pokemon.sprites.front_default;
    card.querySelector('.pokemon-type').textContent = pokemon.types.map(type => type.type.name).join(', ');
    card.querySelector('.pokemon-attack').textContent = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    card.querySelector('.pokemon-defense').textContent = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;

    card.addEventListener('click', () => handleCardClick(card));

    return card;
}

function handleCardClick(card) {
    if (!card.classList.contains('selected')) {
        card.classList.add('selected');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            handleCombat();
        }
    } else {
        card.classList.remove('selected');
        selectedCards = selectedCards.filter(selectedCard => selectedCard !== card);
    }
}

function handleCombat() {
    const attacker = selectedCards[0];
    const defender = selectedCards[1];

    const attackerName = attacker.querySelector('.pokemon-name').textContent;
    const defenderName = defender.querySelector('.pokemon-name').textContent;
    const attackerAttack = parseInt(attacker.querySelector('.pokemon-attack').textContent);
    const defenderDefense = parseInt(defender.querySelector('.pokemon-defense').textContent);

    let combatResultText = '';

    if (attackerAttack > defenderDefense) {
        combatResultText = `${attackerName} (Atacante) gana contra ${defenderName} (Defensor)`;
    } else if (attackerAttack < defenderDefense) {
        combatResultText = `${defenderName} (Defensor) gana contra ${attackerName} (Atacante)`;
    } else {
        combatResultText = 'Combate entre ' + attackerName + ' (Atacante) y ' + defenderName + ' (Defensor) termina en empate';
    }

    const resultItem = document.createElement('li');
    resultItem.textContent = combatResultText;

    document.getElementById('combat-actions').appendChild(resultItem);

    selectedCards.forEach(card => card.classList.remove('selected'));
    selectedCards = [];
}