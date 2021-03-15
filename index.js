$(document).ready(function(){
  // create empty array for search history
var history = []
var cities
// create onclick that grabs value of search form
$('#search').on('click', function(event){
event.preventDefault()
var searchValue= $('#citySearch').val()
console.log(searchValue)
// insert search value into current weather and five day function
// so it completes the function with the parameter of the search value
// so current weather of the searched city can be found 
currentWeather(searchValue)
fiveDay(searchValue)
// conditional statement if search history does not have the searched city in the array or in the history array then push into array
// tracking searched cities inside of the app
if(!history.includes(searchValue))
history.push(searchValue)
console.log(history)
// uvIndex(searchValue)
// turn history array inside of local storage into a string
localStorage.setItem("cities",JSON.stringify(history))

// convert local storage data to javascript object
cities= JSON.parse((localStorage.getItem("cities")))
// clear the history
$('.history').empty()
// iterate through cities from local storage and append to to webpage
for (i=0; i<cities.length; i++){
  $(".history").append(cities[i])
}
});

var APIkey="f68b613983e0ae131f5d600baa16f997"

function currentWeather(searchValue){
  // ajax call to get current weather when given a search value a.k.a searched city & Api key
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}`,
    dataType: "json",
    // responce given from api
    success: function (response) {
      console.log(response)
      // return api date (city name, temp, humidity, wind speed text content into city weather card)
      $('.card-title').text(response.name)
      $('.card-temp').text(`Temp: ${response.main.temp}`)
      $('.card-hum').text(`Humidity: ${response.main.humidity}`)
      $('.card-wind').text(`Wind Speed: ${response.wind.speed}`)
      // get cities longitude and latitude and pass it into uvIndex function
      var lat= response.coord.lat
      var lon= response.coord.lon
      uvIndex(lat,lon)
    }
  });
};


function fiveDay(searchValue){
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${APIkey}`,
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.forecast').empty()
      for (i=0; i<response.list.length; i++){
        if(response.list[i].dt_txt.indexOf("18:00:00")!== -1){
          var col = $('<div>').addClass('col-2')
          var card= $('<div>').addClass('card')
          var body= $('<div>').addClass('card-body')
          var date = $('<h6>').text(new Date(response.list[i].dt_txt).toLocaleDateString())
          var temp=  $('<p>').text(`Temp: ${response.list[i].main.temp}`)
          var humid= $('<p>').text(`Humidity: ${response.list[i].main.humidity}`)
        col.append(card.append(body.append(date,temp,humid)))
        $('.forecast').append(col)
        }
      }
      // $(".card").text(response.list[2]);
    },
  });
};

function uvIndex(lat, lon) {
  $.ajax({
    type: "GET",
    url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`,
    dataType: "json",
    success: function (response) {
      console.log(response) 
      $('.card-uv').empty() 
      var value = $('<p>').text(`UV Index: ${response.value}`)
      $(`.card-uv`).append(value) 
    }
  });
}
console.log(history)

});