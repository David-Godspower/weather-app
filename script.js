const countrySelect = document.getElementById('country-select');
const citySelect = document.getElementById('city-select');

// 1. Fill the Country Dropdown first
async function populateCountries() {
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/info?returns=none');
        const result = await response.json();
        
        // --- ALPHABETICAL SORT FOR COUNTRIES ---
        const sortedCountries = result.data.sort((a, b) => 
            a.name.localeCompare(b.name)
        );

        countrySelect.innerHTML = '<option value="">-- Select Country --</option>';
        sortedCountries.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

// 2. When a country is picked, fetch ITS cities
countrySelect.addEventListener('change', async (e) => {
    const country = e.target.value;
    if (!country) return;

    citySelect.innerHTML = '<option>Loading cities...</option>';

    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: country })
        });
        const result = await response.json();

        // --- ALPHABETICAL SORT FOR CITIES ---
        // Since result.data is just an array of strings, we can sort it directly
        const sortedCities = result.data.sort((a, b) => 
            a.localeCompare(b)
        );

        citySelect.innerHTML = '<option value="">-- Select City --</option>';
        sortedCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } catch (error) {
        citySelect.innerHTML = '<option>Error loading cities</option>';
    }
});

populateCountries();


document.getElementById('city-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get the values
    const selectedCountry = countrySelect.value;
    const city = citySelect.value;

    if (selectedCountry && city) {
        // CLEANING STEP: Remove anything in parentheses like "(Federal Republic of)"
        const cleanCountry = selectedCountry.split(' (')[0].trim();
        
        // Combine them
        const fullLocation = `${city},${cleanCountry}`;
        getWeatherData(fullLocation);
    } else {
        alert('Please select both a country and a city!');
    }
});


// Your API Key from Visual Crossing
const API_KEY = 'VUUBMSZQ8JSAX7L82J6QLQC7F';
let currentTempCelsius = null; // To store the raw number
let isCelsius = true;         // To track the toggle state 

async function getWeatherData(location) {
    const spinner = document.getElementById('spinner');
    const tempDiv = document.getElementById('temp');

    try {
        // A. Show Loading State
        spinner.style.display = 'block';
        tempDiv.textContent = 'Fetching weather...';

        // B. The Fetch Call
        const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`
);;

        if (!response.ok) throw new Error('City not found');

        const rawData = await response.json();

        // C. Clean the Data (Milestone 3)
        const cleanData = processData(rawData);

        // D. Update the Screen (Milestone 4)
        updateUI(cleanData);

    } catch (error) {
        tempDiv.textContent = 'Error: ' + error.message;
    } finally {
        // E. Hide Loading State no matter what
        spinner.style.display = 'none';
    }
}

// This function "cleans" the messy API object
function processData(rawData) {
    currentTempCelsius = rawData.currentConditions.temp; // Save the number here
    return {
        location: rawData.resolvedAddress,
        temp: currentTempCelsius,
        condition: rawData.currentConditions.conditions,
        description: rawData.description,
        icon: rawData.currentConditions.icon
    };
}
const GIPHY_KEY = 'vBgnRlaM3nOokzNTt1YoVaRuHdwsZRCm';

const iconMap = {
    "snow": "❄️",
    "rain": "🌧️",
    "fog": "🌫️",
    "wind": "💨",
    "cloudy": "☁️",
    "partly-cloudy-day": "⛅",
    "clear-day": "☀️",
    "clear-night": "✨"
};
async function updateUI(data) {
    const weatherCard = document.getElementById('weather-card');
    const tempDiv = document.getElementById('temp');
    const spinner = document.getElementById('spinner');

    // 1. Reset state for unit toggle
    isCelsius = true; 

    // 2. Fetch GIPHY
    let gifUrl = "";
    try {
        const gifRes = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${data.condition} weather`);
        const gifData = await gifRes.json();
        // Use optional chaining to prevent crashes if Giphy returns no data
        gifUrl = gifData.data?.images?.fixed_height?.url || "";
    } catch (err) {
        console.error("Giphy failed", err);
    }

    // 3. Display Everything
    const weatherIcon = iconMap[data.icon] || "🌡️";
    
    // Unhide the containers first
    weatherCard.classList.remove('hidden');
    tempDiv.classList.remove('hidden');

    // Inject clean HTML (removed the extra .weather-card div to avoid nesting issues)
    tempDiv.innerHTML = `
        ${gifUrl ? `<img src="${gifUrl}" alt="weather gif" class="weather-gif">` : ''}
        <div class="icon-large">${weatherIcon}</div>
        <h2>${data.location}</h2>
        <p class="temp-display">${data.temp.toFixed(1)}°C</p>
        <p><strong>${data.condition}</strong></p>
        <p><em>${data.description}</em></p>
    `;

    // 4. Background Logic
    const desc = data.condition.toLowerCase();
    if (desc.includes('rain')) {
        document.body.style.background = "linear-gradient(to bottom, #4b5563, #2d3748)";
    } else if (desc.includes('clear')) {
        document.body.style.background = "linear-gradient(to bottom, #3b82f6, #2563eb)";
    } else {
        document.body.style.background = "linear-gradient(to bottom, #1f2937, #111827)";
    }
}


document.getElementById('toggle-temp').addEventListener('click', () => {
    if (currentTempCelsius === null) return; // Don't do anything if no weather is loaded

    const tempDisplay = document.querySelector('.temp-display');
    isCelsius = !isCelsius; // Flip the switch

    if (isCelsius) {
        tempDisplay.textContent = `${currentTempCelsius.toFixed(1)}°C`;
    } else {
        const fahrenheit = (currentTempCelsius * 1.8) + 32;
        tempDisplay.textContent = `${fahrenheit.toFixed(1)}°F`;
    }
});