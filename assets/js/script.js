M.AutoInit();

$(".dropdown-trigger").dropdown();

var containerEl = document.querySelector('.container');
var newStringSubmitEl = document.getElementById('newStringSubmit');
// addedStrings = JSON.parse(localStorage.getItem())
newStringSubmitEl.addEventListener('click', addString);
function addString(event) {
    // event.preventDefault();
    var newStringKeyInputEl = document.getElementById('newStringKeyInput');
    var newStringValueInputEl = document.getElementById('newStringValueInput');
    var newStringName = newStringKeyInputEl.value;
    var newStringContent = newStringValueInputEl.value;
    localStorage.setItem(newStringName, newStringContent);
}
for (i=0; i<localStorage.length; i++) {
    newString = document.createElement('a');
    newString.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red');
    newString.setAttribute('href', localStorage.getItem(localStorage.key(i)));
    newString.innerHTML = localStorage.key(i)
    newString.setAttribute('target', '_blank');
    containerEl.appendChild(newString);
}

var currentCity = document.querySelector('.col')
var firstBtn = document.querySelector('.btn-floating')
firstBtn.addEventListener("click", getWeather)
// city var should probably be changed to a var that accepts an input from the user not just a static place  
var city = 'minneapolis'

var key = "70fc742f790b2f13b5074f8768a1b657";


function getWeather(){
var queryRequest =` http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`
//the API request function
fetch(queryRequest).then(function(res){
    return res .json();
}) .then(function(data){
    //creates var's that are used for the second api request
    var lat = data.coord.lat
    var lon = data.coord.lon
    var cityName = data.name
    // second api request
    var uvapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${key}`
    fetch(uvapi).then(function(res){
        return res .json();
    }) .then(function(data){
        // the data thats being output to the website
        var cityInfo = [cityName, data.current.feels_like, data.current.wind_speed, data.current.humidity, data.current.uvi]
        var titles = ['', 'temp ', 'wind speed ', 'humidity ', 'uvi ']
        currentCity.innerHTML = '';
        //the loop thats creating the actual elements on the website
        for (let i = 0; i < cityInfo.length; i++) {
            let infoDiv = document.createElement('div')
            infoDiv.setAttribute('id', 'infoDiv')
            infoDiv.style.width = '100%';
            infoDiv.innerText = `${titles[i]} ${cityInfo[i]}`
            currentCity.appendChild(infoDiv)
        }
    })
})}

