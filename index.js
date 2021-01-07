$(document).ready(function(){
$('#search').on('click', function(event){
  event.preventDefault()
var searchValue= $('#citySearch').val()
console.log(searchValue)
currentWeather(searchValue)
// fiveDay(searchValue)
// uvIndex(searchValue)
})

var APIkey="f68b613983e0ae131f5d600baa16f997"

function currentWeather(searchValue){
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}`,
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.card-title').text(response.name)
      $('.card-temp').text(`Temp: ${response.main.temp}`)
      $('.card-hum').text(`Humidity: ${response.main.humidity}`)
      $('.card-wind').text(`Wind Speed: ${response.wind.speed}`)
    }
  });
}

function fiveDay(searchValue){
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${APIkey}`,
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.card').text(`${response.list[2]}`)
      
  
    }
  });
}

// function uvIndex(SearchValue) {
//   $.ajax({
//     type: "GET",
//     url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`,
//     dataType: "json",
//     success: function (response) {
//       console.log(response) 
//       $(`.card-uv`).text(`UV: ${response.coord.lon}`)
//       $(`.card-uv`).text(`UV: ${response.coord.lat}`)

      
//     }
//   });
// }

// on start preform 3 functions
// 1. add city to search history 
    // 1.1 append city to search history box
    // 1.1a create empty array & push search name into array
// 2. display current city weather in top upper card
    // 2.1 get city name
    // 2.2 get temperature
    // 2.3 get humidity
    // 2.4 get wind speed
    // 2.5 get UV index
      // 2.5a value if UV index 
      // 2.5b color coding accord to value
    // 2.6 get weather icon
// 3. display 5 day forecast in bottom 5 cards
    // 
// create if function, if uv index is between certain rows make background red, yellow, green.
// be able to click on search history and display time

// var city= userinput

})