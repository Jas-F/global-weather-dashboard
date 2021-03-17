# weather-dashboard
Created a weather dashboard application that displays the current weather for each searched city.

<br>

===========
![Image](weather.gif)

<br>

## Provide Current Weather for Searched City

```
function currentWeather(searchValue) {
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
      var lat = response.coord.lat
      var lon = response.coord.lon
      uvIndex(lat, lon)
    }
```
<br>

## Provide City 5-day Forecast

```
      for (i = 0; i < response.list.length; i++) {
        // conditional statement if list includes 6 p.m. meaning weather at 6 p.m. each day complete this function
        if (response.list[i].dt_txt.indexOf("18:00:00") !== -1) {
          // build 5 day forecast card and body using jquery
          var col = $('<div>').addClass('col-2')
          var card = $('<div>').addClass('card')
          var body = $('<div>').addClass('card-body')
          // create date object using constructor 
          // get date data from api response
          // convert date object to string
          var date = $('<h6>').text(new Date(response.list[i].dt_txt).toLocaleDateString())
          // create key of temp to equal value temp from list of forecast data
          // create key of icon to equal icon from list of forecast data
          // get icon from api
          var iconSrc = (`http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png`)
          // convert the icon data into an image
          var icon = $('<img>').attr("src", iconSrc)
          var temp = $('<p>').text(`Temp: ${response.list[i].main.temp}`)
          // create key of humidity to equal value from list array humidity
          var humid = $('<p>').text(`Humidity: ${response.list[i].main.humidity}`)

          // put all of the variables together to construct forcast cards when city is searched/function is called
          // in a colume of 2 append a card then append a card body to each card, append api response from list array to card body
          // append icon to card body
          // <img src="http://openweathermap.org/img/wn/01d@2x.png" width="50px" height="50px" alt="">
          // append icon to card body
          col.append(card.append(body.append(date, icon, temp, humid)))
          $('.forecast').append(col)
        }
```
<br>

## Display UV Index

```
function uvIndex(lat, lon) {
  // ajax call to get uv index data when given longitude and latitude of the searched city and api key
  $.ajax({
    type: "GET",
    url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`,
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.card-uv').empty()
      // inside card uv div create p tag return text content of UV Index key with a value of response value
      var value = $('<p>').text(`UV Index: ${response.value}`)
      $(`.card-uv`).append(value)
    }
```
<br>


## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Weather API](https://openweathermap.org/api)
  
## References 
* [WeatherIcon](https://openweathermap.org/weather-conditions)


## Deployed Link

* [See Live Site]( https://jas-f.github.io/global-weather-dashboard/)

## License

This project is licensed under the MIT License 

## Prerequisites

Git hub
Git lab
Git bash
Visual studio
Google chrome

## Authors

**Jasmine Franklin** 

- [Link to Portfolio Site](https://jas-f.github.io/responsive-portfolio/index.html)
- [Link to Github](https://github.com/Jas-F/global-weather-dashboard)
- [Link to LinkedIn](https://www.linkedin.com/in/jasmine-franklin-8b08ba121)

<p>&copy; UC Berkeley Extension Bootcamp.</p>
