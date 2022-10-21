var searchFormEl = document.querySelector('#search-form');
var todayCardEl = document.querySelector('#result-card')
var searchInputVal = document.querySelector('#search-input').value;
function getParams(){
searchApi(searchInputVal);
}
function handleSearchFormSubmit(event) {
    event.preventDefault();

    
    if (!searchInputVal) {
        console.error('You need to put in a destination!');
        return;
    }
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);



function printResults(resultObj) {
    console.log(resultObj);
    var currentWeather = document.createElement("div");
    currentWeather.classList.add('row', 'card');

    var currentWeatherBody = document.createElement('div');
    currentWeatherBody.classList.add('card-body');
    currentWeather.append(currentWeatherBody);

    var cityName = document.createElement('h3');
    cityName.textcontent = resultObj.figureout;

    var weatherContent = document.createElement('p');
    weatherContent.innerHTML =
    '<strong>Temp:</strong> ' + resultObj.temperature + '<br/>';
    '<strong>Wind:</strong> ' + resultObj.wind + '<br/>';
    '<strong>Humidity:</strong> ' + resultObj.humidity ;

    currentWeatherBody.append(cityName, weatherContent);

    todayCardEl.append(currentWeatherBody);
}
function searchApi(searchInputVal){
    var cityQueryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' +searchInputVal +'&APPID=8476cfc3106ce9f4f4cdee942c041abe'
  fetch(cityQueryUrl)
  .then(function(response){
    if (!response.ok){
        throw response.json();
    }
    return response.json();
  }) 
  console.log(cityQueryUrl);
}
getParams();
//'http://api.openweathermap.org/geo/1.0/direct?q=' +searchInputVal + '&appid=8476cfc3106ce9f4f4cdee942c041abe';