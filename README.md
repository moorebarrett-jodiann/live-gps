<h1 align="center">📍🚗Live GPS🚗📍</h1>

### Table of contents
- :computer: :point_right: [Demo](https://moorebarrett-jodiann.github.io/live-gps/) :point_left:
- [Description](#description)
- [Functionalities](#functionalities)
- [MapBox and Geolocation](#mapbox-geolocation)
- [Summary](#summary)

### Description

HTML webpage that combines two APIs (HTML Geolocation and MapBox) that shows the live location of a device.
- HTML Geolocation
- EcmaScript (ES)
- [MapBox API](https://www.mapbox.com/)

### Functionalities

Load the webpage on your browser (desktop or mobile) and as you move around, your location pin on the map will reposition.

### Mapbox Geolocation

#### How-To-Use Guide

You will learn:

- How to set up an API key
- How to embed a map in HTML
- How to show markers in your map
- How to update location as you move

#### Introduction

![Map](./src/images/map.png?raw=true "Map")

The Mapbox API contains services such as like Navigation, Geocoding and GeoJSONSource.

Mapbox API is compatible with different platforms such as iOS, Android and Web Services.

Mapbox is free to use based on the number of requests your app receives (i.e. number of user visits your app gets over an average period of time), and if you are looking to integrate with a large system, [different pricing tiers](https://www.mapbox.com/pricing/) are available.

#### Get a Mapbox API key

The steps below might vary as the product gets updated, however, these steps at minimum will get you setup for your first-time use of MapBox API.

1.  Go to <https://www.mapbox.com/>

2.  Click on the button "Start mapping for free" on the main page's call to action button.

3.  You must create an account.

4.  Once on your dashboard, you will see a token in the Access Tokens section. Copy it.

5. Great! You are all set and you should now have access to your API key.

#### Get the script tags of the Mapbox CDN

To import the Mapbox's official library the fastest way possible, you need to use the CDN inside the `<head>` tag of your index.html page.

```html
<script src="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js"></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet"/>
```
#### Create a map

To create our first map we need two files: the `HTML` and the `JavaScript`.

In the `HTML` file we will contain our map in a `div`.

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
  <head>
    <title>My Map</title>
    <script src="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet"/>
    <script type="text/javascript" src="main.js"></script>
  </head>
  <body>
    <h3>My Map</h3>
    <div id="map" style="width: 400px; height: 300px"></div>    
  </body>
</html>
```

And in our `main.js` we'll write the next code:

```javascript
// main.js

mapboxgl.accessToken = "<YOUR-API-KEY>";
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0, 0],
    zoom: 16,
    pitch: 40
});

```
Note that you need to replace `<YOUR-API-KEY>` from `mapboxgl.accessToken` with the key you copied in the section above.

Awesome! 😄 You have a basic map setup. But can you see where you are? No? Okay let's fix that.

#### Adding Markers

Mapbox API has a built-in functionality to add markers in your map so you can see where you are.

To place a marker we need to create an instance of `mapboxgl.Marker()` and add it to the map passing it into the method `addTo`. The below snippet allows you to get the current coordinates of your location and add a blue marker to your map.

```javascript
const marker = new mapboxgl.Marker({ 
    color: '#2B4162' 
});

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
}

function getLocation(position) {
    const {longitude, latitude} = position.coords;
    
    if(longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1_000);
    }    
}

function errorHandler(error) {
    loader.style.animationPlayState = 'paused';
    console.log(error.message);
}

```
Good Work! 👍👍 Now you have a map with a marker showing your current location. But wait 😲😲😲, there's more!

#### Make Your Marker Move

Recall that this project will allow a user to see their live  location as they are moving. MapBox allows this through a `watchposition()` method that updates the coordinates of the device as it's position changes.

The below code enables the watchposition functionality:

```javascript

if(navigator.geolocation) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by your browser');
}

```
`CONGRATULATIONS!!` 🏆🏆🏆 You now have a basic functional device-tracking map. 

### Summary

This lesson demonstrated how to use the basic functionalities of the Mapbox API. You successfully created a map, created a pin and made your pin update to the latest position as you move.

### Extra Resources

[Mapbox JavaScript Documentation](https://www.mapbox.com/mapbox-gl-js/api)

[Mapbox Examples](https://www.mapbox.com/mapbox-gl-js/example/simple-map/)

[Mapbox Plugins](https://www.mapbox.com/mapbox-gl-js/plugins)