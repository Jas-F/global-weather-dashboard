$(document).ready(function(){
$('#search').on('click', function(event){
event.preventDefault()
var searchValue= $('#citySearch').val()
console.log(searchValue)
currentWeather(searchValue)
fiveDay(searchValue)
// uvIndex(searchValue)
});

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
      for (i=0; i<response.list.length; i++){
        if(response.list[i].dt_txt.indexOf("18:00:00")!== -1){
          var col = $('<div>').addClass('col-2')
          var card= $('<div>').addClass('card')
          var body= $('<div>').addClass('card-body')
          var date = $('<h5>').text(new Date(response.list[i].dt_txt).toLocaleDateString())
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
      var value = $('<p>').text(`UV Index: ${response.value}`)
      $(`.card-uv`).append(value)
      

      
    }
  });
}

});

// localStorage.setItem(searchValue)

// $('.history').val(localStorage.getItem(searchValue))