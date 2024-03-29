var searchFormEl = document.querySelector('#search-form');
var todayCardEl = document.querySelector('#result-card');
var fiveDayResultCard= document.querySelector('#five-day-result-card');
var cityStorage = JSON.parse(localStorage.getItem('city'))||[]
function getParams() {
  
}
function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;
    if (!searchInputVal) {
        console.error('You need to put in a destination!');
        return;
    }
    cityStorage.push(searchInputVal);
    localStorage.setItem("city",JSON.stringify(cityStorage))
    
    searchApi(searchInputVal);
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function searchApi(searchInputVal) {
    var cityQueryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInputVal + '&appid=8476cfc3106ce9f4f4cdee942c041abe';
    fetch(cityQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data){
            console.log(data);
        getCurrentWeather(data[0].lat, data[0].lon)
        getFiveDayWeather(data[0].lat, data[0].lon)
        })
    
}
function getCurrentWeather(lat, lon){
    var api = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' +lon+ '&appid=8476cfc3106ce9f4f4cdee942c041abe&units=imperial'
    fetch(api)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function(data){
        console.log(data);
    printResults(data);
    })
}



function printResults(resultObj) {
    todayCardEl.innerHTML= '';
    var currentWeather = document.createElement("div");
    currentWeather.classList.add('card');

    var currentWeatherBody = document.createElement('div');
    currentWeatherBody.classList.add('card-body');
    currentWeather.append(currentWeatherBody);

    var cityName = document.createElement('h3');
    cityName.textContent = resultObj.name;

    var weatherContent = document.createElement('p');
    weatherContent.innerHTML =
    '<img src="https://openweathermap.org/img/wn/'+ resultObj.weather[0].icon +'@2x.png"><br/><strong>Temp:</strong> ' + resultObj.main.temp + '<br/><strong>Wind:</strong> ' + resultObj.wind.speed + '<br/><strong>Humidity:</strong> ' + resultObj.main.humidity;

    currentWeatherBody.append(cityName, weatherContent);

    todayCardEl.append(currentWeatherBody);
}

function getFiveDayWeather(lat, lon){
    var api = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon=' +lon+ '&appid=8476cfc3106ce9f4f4cdee942c041abe&units=imperial'
    fetch(api)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function(data){
        console.log(data);
    printFiveDay(data);
    })
}
function printFiveDay(resultObj) {
    fiveDayResultCard.innerHTML= '';
    for(var i = 0; i < resultObj.list.length; i+= 8){
    var currentWeather = document.createElement("div");
    currentWeather.classList.add('card', 'col-md-2');

    var currentWeatherBody = document.createElement('div');
    currentWeatherBody.classList.add('card-body');
    currentWeather.append(currentWeatherBody);
    
    var date = document.createElement('h3');
    date.textContent = moment.unix(resultObj.list[i].dt).format("MMMM DD YYYY");
   

    var weatherContent = document.createElement('p');
    weatherContent.innerHTML =
    '<img src="https://openweathermap.org/img/wn/'+ resultObj.list[i].weather[0].icon +'@2x.png"><br/><strong>Temp:</strong> ' + resultObj.list[i].main.temp + '<br/><strong>Wind:</strong> ' + resultObj.list[i].wind.speed + '<br/><strong>Humidity:</strong> ' + resultObj.list[i].main.humidity;

    currentWeatherBody.append(date, weatherContent);
    currentWeather.append(currentWeatherBody);

    fiveDayResultCard.append(currentWeather);
}}



