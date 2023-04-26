'use strict';

/*--------------------------------------------------------------------------- *
 * Live Geolocation
 * Jodi-Ann Barrett
 * 
 * */

// Utility Functions 
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
  }
  
// Select HTML element by class, id and html element
function select(selector, parent = document) {  
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {  
    return parent.querySelectorAll(selector);
}

/**-----------------------------------DATA------------------------------------ */

const overlay = select('.overlay');
const loader = select('.overlay .loader');

// Map interface handlers
const scrollZoom = 'scrollZoom';
const boxZoom = 'boxZoom';
const doubleClickZoom = 'doubleClickZoom';
const dragRotate = 'dragRotate';

// getting directions
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9kaWFubmJhcnJldHQiLCJhIjoiY2xiZ3JxMzJmMGFjcDN2bW1ydjlpc2NjYyJ9.pgkAM_oUNu6TpYp8ScH9Ow';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0, 0],
    zoom: 16,
    pitch: 40
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();
map.dragRotate.disable();

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

/**
 * The watchPosition() method is used to register a handler function that will be called automatically, 
 * each time the position of the device changes
 */
if(navigator.geolocation) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by your browser');
}

/***
 * Feature to control routes between two sites
 */
map.addControl(new MapboxDirections({
    accessToken: mapboxgl.accessToken
}), 'top-left');
