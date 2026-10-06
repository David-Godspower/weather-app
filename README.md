# 🌦️ Weather App

A lightweight, browser-based weather application that lets users choose a country and city, then view the current weather conditions for that location.

The app uses a country-and-city selection flow instead of requiring users to type a location manually. Weather results include the current temperature, conditions, a descriptive summary, an emoji-based weather icon, and an optional weather GIF.

## ✨ Features

- **Country selection:** Loads an alphabetical list of countries from the CountriesNow API.
- **City selection:** Loads and alphabetizes available cities after a country is selected.
- **Current weather:** Displays the selected location's current temperature and weather conditions.
- **Temperature conversion:** Switches the displayed temperature between Celsius and Fahrenheit.
- **Condition-based visuals:** Shows an emoji weather icon and fetches a related GIF from GIPHY.
- **Dynamic backgrounds:** Updates the page background based on the current weather condition.
- **Loading and error states:** Displays a spinner while weather data is being fetched and reports failed requests.
- **Responsive layout:** Uses a centered, glass-style interface that works across modern browsers.

## 🛠️ Built with

- **HTML5** for the application structure
- **CSS3** for layout, gradients, glassmorphism, animations, and responsive styling
- **JavaScript (ES6+)** for API requests, dropdown management, data processing, unit conversion, and DOM updates
- **CountriesNow API** for countries and city lists
- **Visual Crossing Weather API** for current weather data
- **GIPHY API** for condition-related animated visuals
- **Font Awesome** for social media and contact icons

## 🚀 Getting started

### Prerequisites

You need:

- A modern web browser
- An internet connection
- Optional: the **Live Server** extension for VS Code

No build tools, package manager, or backend runtime is required for the current version.

### Run locally

1. **Clone the repository**

   ```bash
   git clone <https://github.com/david-godspower/weather-app>
   ```

2. **Open the project directory**

   ```bash
   cd weather-app
   ```

3. **Launch the app**

   Open `index.html` directly in your browser, or serve the folder with Live Server:

   ```text
   Right-click index.html → Open with Live Server
   ```

4. Choose a country, choose a city, and click **Submit** to load the weather.

## 📁 Project structure

```text
weather-app/
├── index.html   # Page structure, selectors, weather card, and footer
├── style.css    # Layout, theme, responsive styles, and animations
├── script.js    # API integration and application logic
└── README.md    # Project documentation
```

## 🔌 API workflow

The application loads data in the following order:

1. Countries are loaded from CountriesNow when the page starts.
2. Selecting a country triggers a request for its available cities.
3. Submitting a city requests current weather data from Visual Crossing.
4. The weather response is processed into the location, temperature, condition, description, and icon.
5. GIPHY is queried for a visual related to the returned weather condition.
6. The result is rendered in the weather card and the page background is updated.

An internet connection is required for country, city, weather, and GIF data to load.

## 🔐 API key security

The current frontend implementation calls Visual Crossing and GIPHY directly from the browser. API keys included in browser JavaScript can be viewed by anyone using the application.

For a production deployment, move authenticated API requests to a backend or serverless function and store keys in environment variables or a secret manager. Never commit private API keys to a public repository.

## 🌡️ Temperature conversion

Weather data is requested in metric units and initially displayed in Celsius. The **°C/°F** button converts the stored Celsius value locally:

```text
Fahrenheit = (Celsius × 1.8) + 32
```

## 👤 Author

**David Godspower Ajala**

- [Portfolio](https://davidgodspowerajala.me)
- [LinkedIn](https://www.linkedin.com/in/david-godspower-ajala/)
- [Facebook](https://facebook.com/DavidGodspowerAjalaDGA/)
- [Twitter/X](https://x.com/DavidGAjala)
- [Email](mailto:ajaladavid11@gmail.com)

## 📄 License

No license file is currently included in the project. Add a `LICENSE` file if you plan to publish the project for reuse, or specify the applicable license here.
