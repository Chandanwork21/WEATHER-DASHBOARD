# WEATHER-DASHBOARD


## WEATHER APP - WEATHERLY
This Weather App, built using React, provides real-time weather updates using a weather API. It displays the current temperature, humidity, and wind speed, along with a 24-hour forecast for any searched location. 

The app enhances user experience with a dynamic background that changes based on temperature variations, making the interface visually engaging. If a city is not found, it displays a "No result found" message for clear user feedback. By default, the app loads weather data for Mumbai to provide instant information upon opening.

Hooks have been used, useState hook for state management of city weather,managing background and for 24 hour forecast for searched location. useEffect hook has been used for managing the side effects like retrieving api from weatherapi.com , setting the app background according to the temperature value of a city searched. useRef hook hav been used for to store a mutable value that does not cause a re-render when updated, here useRef has been used for search input as it changes the re-render doesn't occur and smoothly gives the current weather of searched locations.  

The app is fully responsive, ensuring seamless usability across mobile, tablet, and desktop devices. With a clean UI and smooth performance, this weather app delivers an intuitive and interactive weather-tracking experience.

## OUTPUT IMAGES

Image 1
![Image](https://github.com/user-attachments/assets/c8c9b9dd-c13b-4522-8c59-6ee5f5bfcba5)

Image 2
![Image](https://github.com/user-attachments/assets/c1271961-cb98-4609-b853-1b90fbf33551)

Image 3
![Image](https://github.com/user-attachments/assets/e59a3f95-e2bc-4cee-905f-c1ae32a8f9c5)

Image 4
![Image](https://github.com/user-attachments/assets/c61e3216-d3a2-44c3-a0b8-35db4c3c802b)

Note - This output images shows the weather of uploading time. There can be  different values in future. 

# Live Demo :- https://weather-dashboard-theta-ochre.vercel.app/

