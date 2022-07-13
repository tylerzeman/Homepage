// MATERIALIZE
M.AutoInit();
$(".dropdown-trigger").dropdown();
// ADD A LINK ON CLICK
document.getElementById('newStringSubmit').addEventListener('click', addString);
function addString() {
    var newStringName = document.getElementById('newStringKeyInput').value;
    var newStringContent =document.getElementById('newStringValueInput').value;
    localStorage.setItem(newStringName, newStringContent);
};
// WRITE LOCALLY STORED LINKS TO PAGE
for (i=0; i<localStorage.length; i++) {
    newString = document.createElement('a');
    newString.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red');
    newString.setAttribute('href', localStorage.getItem(localStorage.key(i)));
    newString.innerHTML = localStorage.key(i);
    newString.setAttribute('target', '_blank');
    document.getElementById('stringContainer').appendChild(newString);
};
// CLEAR LOCALLY STORED LINKS
document.getElementById('clearStringsBtn').addEventListener('click', function clearStrings() {
    localStorage.clear();
});
// DATE AND TIME
setInterval(function timeNow() {
    currentDate = moment().format('dddd, MMMM do YYYY, h:mm a');
    document.getElementById('date').innerText = currentDate;
}, 100);

// the var's for the weather function

var key = "70fc742f790b2f13b5074f8768a1b657";
var currentCity = document.querySelector('#weather')
var firstBtn = document.querySelector('#inputSub')

// the button to start the weather function

firstBtn.addEventListener("click", function(event){
    event.preventDefault()
    getWeather()
})  

// the function to get the current weather
function getWeather(){
    var city = document.getElementById('cityInput').value
    console.log(city)
var queryRequest =` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`
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

// MOTIVATIONAL QUOTE GENERATOR
queryURL=(`https://motivational-quote-api.herokuapp.com/quotes`)
fetch(queryURL).then(function(res) {
    return res.json();
}).then(function(data) {
    console.log(data);
    var randomQuote = data[Math.floor(Math.random(data) * data.length)];
    console.log(randomQuote)
    document.getElementById('motivQuote').innerText = `"${randomQuote.quote}"`;
    document.getElementById('motivQuotePerson').innerText = `- ${randomQuote.person}`
});


var darkMode= document.getElementById('darkMode');
var lightMode = document.getElementById('lightMode');
// var theme3 = document.getElementById('theme3');
var colEl = document.querySelectorAll('.col')
console.log(colEl)

lightMode.addEventListener('click', function() {
    document.body.style.background = 'rgb(240, 238, 238)'
    document.body.style.color = 'black'
    document.getElementById('cityInput').style.color = 'black'
    for (i=0; i<colEl.length; i++) {
        colEl[i].style.backgroundColor = 'rgba(224, 224, 224, 0.75';
    }
})


darkMode.addEventListener('click', function() {
    document.body.style.background = 'rgb(77, 73, 73)'
    console.log(document.body.style.background)
    document.body.style.color = 'rgb(173, 186, 171)'
    document.getElementById('cityInput').style.color = 'rgb(173, 186, 171)'
    for (i=0; i<colEl.length; i++) {
        colEl[i].style.backgroundColor = 'black';
    }
})