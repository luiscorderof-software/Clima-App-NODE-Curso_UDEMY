// import { create } from 'axios'; // formato según ES6
const axios = require('axios').default;

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad',
        demand: true
    }
}).argv;

console.log(argv.direccion);

/*
const instance = axios.create({
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=Ottawa',
    timeout: 1000,
    headers: { 'x-rapidapi-key': 'c734a35f73msh8e5327000adead0p1d988ejsnbb1e6b6eaaa6' }
    headers: { 'X-Custom-Header': 'foobar' }
});
*/
/*
const instance = axios.create({
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=Ottawa',
    headers: { 'X-RapidAPI-Key': 'c734a35f73msh8e5327000adead0p1d988ejsnbb1e6b6eaaa6' }
});

instance.get()
    .then(resp => {
        console.log(resp);
    })
    .catch(err => {
        console.log('ERROR: ', err);
    });

console.log(instance);
*/

const encoded_Url = encodeURI(argv.direccion);
console.log(encoded_Url);

// Parámetros según el mismo GEOCODING
var options = {
    method: 'GET',
    url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
    params: { address: `${encoded_Url}`, language: 'es' },
    headers: {
        'x-rapidapi-key': 'c734a35f73msh8e5327000adead0p1d988ejsnbb1e6b6eaaa6',
        'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
    }
};

axios.request(options).then(function(response) {
    const direccion = encoded_Url;
    // console.log(response.data);
    // console.log(response.data.results);
    const data = response.data.results[0].geometry;

    // console.log(data);
    const lati = data.location.lat;
    const long = data.location.lng;

    return {
        direccion,
        lati,
        long
    }
}).catch(function(error) {
    console.error(error);
});