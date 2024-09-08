// public/main.js
let currentPage = 1;
const playersPerPage = 15;
let allPlayers = [];

async function fetchData() {
    try {
        const response = await fetch('/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        allPlayers = result;
        displayPlayers(allPlayers.slice(0, playersPerPage));
        document.getElementById('spinner').style.display = 'none'; // Hide spinner after loading
        document.getElementById('playerTable').style.display = 'table'; // Show table
        document.querySelector('.pagination').style.display = 'block'; // Show pagination
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayPlayers(players) {
    const playerTableBody = document.querySelector('#playerTable tbody');
    const fragment = document.createDocumentFragment();

    players.forEach(player => {
        const row = document.createElement('tr');

        const imgCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = `https://mc-heads.net/avatar/${player.uuid}`;
        img.alt = `${player.name}'s head`;
        img.onerror = () => {
            img.src = 'https://mc-heads.net/avatar/512/8667ba71-b85a-4004-af54-457a9734eed7';
        };
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = player.name;
        nameCell.style.cursor = 'pointer';
        nameCell.addEventListener('click', () => {
            window.location.href = `player.html?uuid=${player.uuid}`;
        });
        row.appendChild(nameCell);

        const bossKillsCell = document.createElement('td');
        bossKillsCell.textContent = player.bossKills;
        row.appendChild(bossKillsCell);

        fragment.appendChild(row);
    });

    playerTableBody.innerHTML = '';
    playerTableBody.appendChild(fragment);
}

function updatePagination() {
    const start = (currentPage - 1) * playersPerPage;
    const end = start + playersPerPage;
    displayPlayers(allPlayers.slice(start, end));
    document.getElementById('spinner').style.display = 'none'; // Hide spinner after updating
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        document.getElementById('spinner').style.display = 'block'; // Show spinner
        setTimeout(() => {
            currentPage--;
            updatePagination();
        }, 500); // Delay to simulate loading
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * playersPerPage < allPlayers.length) {
        document.getElementById('spinner').style.display = 'block'; // Show spinner
        setTimeout(() => {
            currentPage++;
            updatePagination();
        }, 500); // Delay to simulate loading
    }
});

document.getElementById('playerTable').style.display = 'none'; // Hide table initially
document.querySelector('.pagination').style.display = 'none'; // Hide pagination initially
document.getElementById('spinner').style.display = 'block'; // Show spinner initially

fetchData();