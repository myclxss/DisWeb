// public/player.js
async function fetchPlayerData(uuid) {
    try {
        const response = await fetch(`/data?uuid=${uuid}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const player = await response.json();
        displayPlayerDetails(player);
    } catch (error) {
        console.error('Error fetching player data:', error);
    }
}

function displayPlayerDetails(player) {
    document.getElementById('playerAvatar').src = `https://mc-heads.net/avatar/${player.uuid}`;
    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerBossKills').textContent = `Boss Kills: ${player.bossKills}`;
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('playerDetails').style.display = 'block';
}

const urlParams = new URLSearchParams(window.location.search);
const playerUuid = urlParams.get('uuid');
if (playerUuid) {
    document.getElementById('spinner').style.display = 'block';
    fetchPlayerData(playerUuid);
}
// public/player.js
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});