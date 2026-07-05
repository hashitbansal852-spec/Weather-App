const BASE_URL = "https://api.weatherapi.com/v1/current.json?key=d4c08f9953f44387aea130900260507&q=London";

const input = document.querySelector(".searchbox input");
const btn = document.querySelector(".searchbox button");
const tempu = document.querySelector(".temp h2");
const humu = document.querySelector("#humi");
const weatheru = document.querySelector("#cloud");
const img = document.querySelector("#image");
const locatio = document.querySelector("#location");

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    try {
        let city = input.value.trim();
        if (!/^[a-zA-Z\s]+$/.test(city)) {
            img.src = "person.png";
            locatio.innerText = `Invalid City`;
            tempu.innerText = `-----°C`;
            humu.innerText = `-----%`;
            weatheru.innerText = `-----`;
            return;
        }
        if (city.length < 3) {
            img.src = "person.png";
            locatio.innerText = `Invalid City`;
            tempu.innerText = `-----°C`;
            humu.innerText = `-----%`;
            weatheru.innerText = `-----`;
            return;
        }
        let cities = city[0].toUpperCase() + city.slice(1);
        locatio.innerText = cities;
        let URL = `https://api.weatherapi.com/v1/current.json?key=d4c08f9953f44387aea130900260507&q=${cities}`
        let response = await fetch(URL);
        let data = await response.json();
        let temperature = data.current.temp_c;
        let weather = data.current.condition.text;
        let humidity = data.current.humidity;
        tempu.innerText = `${temperature}°C`;
        humu.innerText = `${humidity}%`;
        weatheru.innerText = weather;
        let icon = data.current.condition.icon;
        img.src = "https:" + icon;
    } catch (error) {
        console.log(error);
    }
})
