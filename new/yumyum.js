// Set API URL and key.
const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const apiKey = "yum-BAPUdN5hTPLuk3iN";

// Function to fetch menu from API (using "async").
async function fetchMenu() {
    try { // Using "try" to handle errors.
        const response = await fetch(`${apiUrl}menu`, { // Send request to get info from API using "fetch". 
            method: 'GET', // Using method "GET" to get info from API.
            headers: { // "Headers" = sections that request information from API.
                "x-zocom": apiKey // Sending API key to verify the user's identity.
            }
        });

        if (!response.ok) { // Check if the response status is not OK.
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const menuData = await response.json(); // Convert the data returned from the API (response) into a JS Object or Array.
        console.log(menuData); 
        renderMenu(menuData.items); // Pass menu items to renderMenu.             
    } catch (error) { // Handle errors.
        console.error("Error fetching menu:", error);
    }   
}
fetchMenu();

// Function to display a menu on an HTML page.
function renderMenu(menuData) {
    const menuContainer = document.getElementById('menu-container');

    // Remove old info.
    menuContainer.innerHTML = `
        <h1 class="menu-title">MENY</h1>
        <ul class="menu-section"></ul>
        <ul class="menu-list"></ul>
    `;

    const menuSection = menuContainer.querySelector('.menu-section');

    // Loop for menu.
    menuData.forEach(item => {
        const menuItem = document.createElement('li'); 
        menuItem.classList.add('menu-item'); 
        menuItem.innerHTML = `
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price} SEK</span>
            </div>
            <p class="item-description">${item.description}</p>
        `;
        menuSection.appendChild(menuItem); // Append each menu item to the section.
    });
}
