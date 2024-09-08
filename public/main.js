// public/main.js
async function fetchData() {
    try {
        const response = await fetch('/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        displayPlayers(result.slice(0, 10)); // Mostrar solo los primeros 10 jugadores inicialmente

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredPlayers = result.filter(player =>
                player.name.toLowerCase().includes(searchTerm)
            );
            if (searchTerm === '') {
                displayPlayers(result.slice(0, 10)); // Mostrar solo los primeros 10 jugadores si no hay filtro
            } else {
                displayPlayers(filteredPlayers);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayPlayers(players) {
    const containerDiv = document.getElementById('container');
    containerDiv.innerHTML = '';

    players.forEach(player => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'player-card';

        const uuidP = document.createElement('p');
        uuidP.textContent = `UUID: ${player.uuid}`;
        cardDiv.appendChild(uuidP);

        const nameP = document.createElement('p');
        nameP.textContent = `Name: ${player.name}`;
        cardDiv.appendChild(nameP);

        const bossKillsP = document.createElement('p');
        bossKillsP.textContent = `Boss Kills: ${player.bossKills}`;
        cardDiv.appendChild(bossKillsP);

        containerDiv.appendChild(cardDiv);
    });
}

fetchData();