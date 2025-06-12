const key = "5bc175cadd49e9ce0d6b24f340a6826b";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");
const gbtn = document.getElementById('geo-btn')

function gotLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

  fetch(geoUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      updateweather(data);
    })
}
function Failed(){
  console.log("Issue getting the location");
}

gbtn.addEventListener("click" , ()=>{
  const result = navigator.geolocation.getCurrentPosition(gotLocation, Failed);
})

async function weather(location){
  const response = await fetch(url + location + `&appid=${key}`);
  var data = await response.json();
  console.log(data);
  updateweather(data);}

function updateweather(data){
  
  document.querySelector(".location").innerHTML = data.name + ", " + data.sys.country;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity +' %';
  document.querySelector(".weather-description").innerHTML = data.weather[0].main;
  document.querySelector(".wind").innerHTML = data.wind.speed + ' km/hr';
  document.querySelector(".pressure").innerHTML = data.main.pressure + ' hPa';
  document.querySelector(".feels").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°c";
  document.querySelector(".visibility").innerHTML = data.visibility/1000 + ' km';
  
  if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "clouds.png";
  }
  else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "clear.png";
  }
  else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "drizzle.png";
  }
  else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "mist.png";
  }
  else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "rain.png";
  }
  else if(data.weather[0].main == "Snow"){
    weatherIcon.src = "snow.png";
  }

  
}

function setCurrentDate() {
  const date = document.getElementById("current-date");

  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, options);

  date.textContent = formattedDate;
}



setCurrentDate();

searchBtn.addEventListener("click" , ()=>{
  weather(searchBox.value);
})



function toggleTheme() {
  document.body.classList.toggle('dark');
}