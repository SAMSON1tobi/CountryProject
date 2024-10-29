let allCountries = []; // This will hold all the country data

// Fetch all countries when the page loads
window.onload = () => {
    fetchCountries();
};

// Function to fetch all countries
function fetchCountries() {
    const url = 'https://restcountries.com/v3.1/all';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            allCountries = data;
            displayCountries(data); // Display all countries initially
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

// Function to display countries in a grid
function displayCountries(countries) {
    const countriesGrid = document.getElementById('countries-grid');
    countriesGrid.innerHTML = ''; // Clear the grid before displaying

    countries.forEach(country => {
        const { name, flags, population, region } = country;

        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        countryCard.innerHTML = `
            <img src="${flags.svg}" alt="Flag of ${name.common}">
            <p><strong>Country:</strong> ${name.common}</p>
            <p><strong>Population:</strong> ${population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${region}</p>
        `;

        countriesGrid.appendChild(countryCard);
    });
}

// Function to filter countries by both search query and region
function filterCountries() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const selectedRegion = document.getElementById('region-select').value;

    let filteredCountries = allCountries;

    // Filter by region
    if (selectedRegion !== 'all') {
        filteredCountries = filteredCountries.filter(country => country.region === selectedRegion);
    }

    // Filter by search query (country name)
    filteredCountries = filteredCountries.filter(country => country.name.common.toLowerCase().includes(searchInput));

    // Display the filtered list
    displayCountries(filteredCountries);
}
