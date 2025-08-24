let imgboxelem = document.querySelector(".img-box");
let city = "gangapur";
let isLoading = false;

async function getdata() {
  if (isLoading) return; // prevent multiple requests
  isLoading = true;
  const inputElem = document.querySelector("#inputelem");
  const cityInput = city.trim();
  if (!cityInput) {
    alert("Please enter a city name.");
    isLoading = false;
    return;
  }

  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    cityInput
  )}&APPID=6fb69f71d0f94210dc9f87189ceb4230`;
  try {
    const response = await fetch(apiurl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (
      data.cod == 200 &&
      data.weather &&
      data.weather[0] &&
      data.main &&
      data.wind
    ) {
      imgboxelem.style.backgroundImage = `url(images/${data.weather[0].icon}.png)`;
      document.querySelector(".temperature-felt").innerHTML = `${(
        data.main.feels_like - 273.15
      ).toFixed(2)} <sup>&#176;</sup>C <span>Temperature Felt</span>`;
      document.querySelector(".visibility").innerHTML = `${
        data.visibility ? data.visibility / 1000 : "N/A"
      } km<span>Visibility</span>`;
      document.querySelector(
        ".air-pressure"
      ).innerHTML = `${data.main.pressure} hPa<span>Air Pressure</span>`;
      document.querySelector(
        ".humidity"
      ).innerHTML = `${data.main.humidity} %<span>Humidity</span>`;
      document.querySelector(
        ".SW"
      ).innerHTML = `${data.wind.speed} m/s <span>SW</span>`;
      document.querySelector(".city-name").textContent = cityInput;
      document.querySelector(".temperature").innerHTML = `${(
        data.main.temp - 273.15
      ).toFixed(2)} <sup>&#176;</sup>C`;
    } else {
      imgboxelem.style.backgroundImage = "none";
      document.querySelector(".city-name").textContent = "City Not Found";
      document.querySelector(".temperature").textContent = "";
      document.querySelector(".temperature-felt").textContent = "";
      document.querySelector(".visibility").textContent = "";
      document.querySelector(".air-pressure").textContent = "";
      document.querySelector(".humidity").textContent = "";
      document.querySelector(".SW").textContent = "";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("There was a problem retrieving the data. Please try again later.");
    imgboxelem.style.backgroundImage = "none";
  } finally {
    isLoading = false;
  }
}

document.querySelector(".get-data").addEventListener("click", () => {
  city = document.querySelector("#inputelem").value;
  getdata();
});
document.querySelector("#inputelem").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    city = document.querySelector("#inputelem").value;
    getdata();
  }
});
getdata();
