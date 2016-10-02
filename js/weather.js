
    // start by building variables
    var loc = document.getElementById('location');
    var weather = document.getElementById('weather-data');
    var deg = document.getElementById('degrees');
    /*
    to fulfill the first requirement (user can see the weather in their current location)
    I need to send 2 requests to the server: one for the location and one for the weather
    */


    //Build a function to get location data from the web, for example use freegeoip
    function getLocation()
     {
        var url = 'http://freegeoip.net/json/';
        //build variables where to store parsed data from JSON
        var parseLoc,
            city,
            region,
            latitude,
            longitude,
            displayLoc;
        //send a request to get the location using standard javascript syntax

        var requestLoc = new XMLHttpRequest();
        requestLoc.onreadystatechange = function() {
            
            // if the connection is successful and the request goes thru
            if (requestLoc.readyState === 4) 
            {
                loc.innerHTML = '... request received ...';
                
                // check if the API sent back OK TO GO
                if (requestLoc.status === 200)
                 {
                    // parse the JSON response
                    parseLoc = JSON.parse(requestLoc.responseText);
                    
                    // assign parsed response to variables
                    city = parseLoc.city;
                    region = parseLoc.region_name;
                    latitude = parseLoc.latitude;
                    longitude = parseLoc.longitude;
                    
                    
                    // what I want to display is the city, with the region
                    displayLoc = city + ', ' + region;
          
                    
                    // assign to innerHtml
                    loc.innerHTML = displayLoc;
                    
                    //Repeat same reasoning for the weather
                    //Need to fix my API key
                    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=80058d224d4915384c1749bf88529005';
                    var parsedWeather,
                        icon,
                      	temp,
                        C,
                        F,
                        celsius,
                        displayWeather,
                        degHtml;

                    var wRequest = new XMLHttpRequest();
                    wRequest.onreadystatechange = function()
                     {
                        if (wRequest.readyState === 4) 
                        {
                            weather.innerHTML = '... request received ...';
                            if (wRequest.status === 200) 
                            {
                                parsedWeather = JSON.parse(wRequest.responseText);
                                icon = parsedWeather.weather[0].id;
                                temp = parsedWeather.main.temp;
                                C = Math.round(temp - 273.15);
                                F = Math.round((temp * (9 / 5)) - 459.67);
                                displayWeather = '<div>' 
                                + '<i class="wi wi-owm-' + icon + '"></i></div>';

                                celsius = true;
                                degHtml = C + '&deg; C';
                                deg.innerHTML = degHtml;

                                var switcher = document.getElementById('switcher');
                                switcher.addEventListener('click', function() {
                                    
                                    if (celsius === true) 
                                    {
                                        degHtml = F + '&deg; F';
                                        deg.innerHTML = degHtml;
                                        celsius = false;
                                    } else 
                                    {
                                        degHtml = C + '&deg; C';
                                        deg.innerHTML = degHtml;
                                        celsius = true;
                                    }
                                    
                                }, false);

                                weather.innerHTML = displayWeather;

                            } else
                             {
                                   weather.innerHTML = 'Request for weather received by server, but there is a problem with response: ' + wRequest.status;
                            }
                        }
                    }

                    wRequest.open('GET', weatherUrl, false);
                    wRequest.send(null);
                } else
                 {
                    loc.innerHTML = 'Request for location received by server, but there is a problem with response: ' + requestLoc.status;
                }
            }
        }
        
        requestLoc.open('GET', url, true);
        requestLoc.send(null);
    }

    getLocation();



// sample JSON

// {
//   "coord": {
//     "lon": -122.76,
//     "lat": 45.46
//   },
//   "weather": [
//     {
//       "id": 801,
//       "main": "Clouds",
//       "description": "few clouds",
//       "icon": "02n"
//     }
//   ],
//   "base": "cmc stations",
//   "main": {
//     "temp": 293.84,
//     "pressure": 1011.71,
//     "humidity": 65,
//     "temp_min": 293.84,
//     "temp_max": 293.84,
//     "sea_level": 1035.44,
//     "grnd_level": 1011.71
//   },
//   "wind": {
//     "speed": 2.61,
//     "deg": 332.003
//   },
//   "clouds": {
//     "all": 20
//   },
//   "dt": 1463531507,
//   "sys": {
//     "message": 0.0038,
//     "country": "US",
//     "sunrise": 1463574997,
//     "sunset": 1463629144
//   },
//   "id": 7261327,
//   "name": "Garden Home-Whitford",
//   "cod": 200
// }






  
  
  
  
  
  
  
  
  
  
