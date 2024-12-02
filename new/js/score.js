// Läs in resultaten från localStorage
const gameResults = JSON.parse(localStorage.getItem("gameResults")) || [];

console.log(gameResults);

// Funktion för att visa resultaten
function laggTillResultat(result) 
{
    const resultContainer = document.getElementById('result-lista');
    resultContainer.innerHTML = '';

    // Header-rad
    const headerRow = document.createElement('div');
    headerRow.classList.add('result-item', 'header-row');
    headerRow.innerHTML = `
        <div class="column"><strong>Avatar</strong></div>
        <div class="column"><strong>Spelare</strong></div>
        <div class="column"><strong>Felaktiga Gissningar</strong></div>
        <div class="column"><strong>Ordets Längd</strong></div>
        <div class="column"><strong>Tid</strong></div>
        <div class="column"><strong>Resultat</strong></div>`;
    resultContainer.appendChild(headerRow);

    // Lägg till varje spelares resultat
    result.forEach((player) => 
    {
        /*const formattedTime = new Date(player.time).toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });*/

        //hämta avatar-bild från start
        const avatarName = player.avatar || localStorage.getItem("selectedAvatar");

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <div class="column">
                <img src="img/${avatarName}.png" alt="${avatarName}" class="clickable-image" />
            </div>
            <div class="column">${player.name}</div>
            <div class="column">${player.incorrectGuesses}</div>
            <div class="column">${player.wordLength}</div>
            <div class="column">${new Date(player.time).toLocaleString()}</div>
            <div class="column">${player.guessedCorrectly ? 'Vann' : 'Förlorade'}</div>`;
        resultContainer.appendChild(resultItem);
    });
}


//för att visa resultaten
laggTillResultat(gameResults);


// Sortering av antal gissningar
document.getElementById('sort-button').addEventListener('click', () => 
{
    const sortedResults = gameResults.sort((a, b) => a.incorrectGuesses - b.incorrectGuesses);
    laggTillResultat(sortedResults);
});

// sortering av datum/tid
document.getElementById('time-button').addEventListener('click', () => 
{
    const sortedResults = gameResults.sort((a, b) => new Date(b.time) - new Date(a.time));
    laggTillResultat(sortedResults);
});

//rensa lista
/*document.getElementById('clear-results').addEventListener('click', () => {
    localStorage.removeItem("gameResults");
    laggTillResultat([]); // Visa en tom lista
}); */


//spela igen knapp-score
document.querySelector('#spela-igen-btn-score').addEventListener('click', function() {
	hideWiews()
	document.querySelector('#body-game').classList.remove('hide');
	
});

function hideWiews() {
	const bodyStart = document.querySelector('#body-start'); 
	const bodyGame = document.querySelector('#body-game'); 
	const bodyScore = document.querySelector('#body-score');
	document.querySelector('#body-game').classList.add('hide');
	document.querySelector('#body-score').classList.add('hide');
	document.querySelector('#body-start').classList.add('hide');
}