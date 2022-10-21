var searchFormEl = document.querySelector('#search-form');
var todayCardEl = document.querySelector('#result-card')

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;
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