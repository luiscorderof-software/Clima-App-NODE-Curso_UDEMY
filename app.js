const axios = require('axios').default;
const lugar = require('./Ubicacion/Ubicacion');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad',
        demand: true
    }
}).argv;

console.log(argv.direccion);


// console.log(lugar.getLugar(argv.direccion));
/*
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
*/

var options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
        q: `${argv.direccion}`,
        lat: '0',
        lon: '0',
        callback: 'test',
        id: '2172797',
        lang: 'null',
        units: '"metric" or "imperial"',
        mode: 'xml, html'
    },
    headers: {
        'x-rapidapi-key': 'c734a35f73msh8e5327000adead0p1d988ejsnbb1e6b6eaaa6',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
};

axios.request(options).then(function(response) {
    console.log(response.data);
}).catch(function(error) {
    console.error(error);
});