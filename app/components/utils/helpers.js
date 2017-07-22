// Include the axios package for performing HTTP requests (promise based alternative to request)

//var request = require("request");
var axios = require("axios");

// var SpotifyWebApi = require('spotify-web-api-node');

//   var SpotifyWebApi = require('spotify-web-api-node');

// Helper functions 
var helpers = {

    //this actualy scrapes - 

    scrape: function() {
        return axios.get("/scrape");
    },

    playSong: function(result) {
        console.log("helpers " + result.title);
        return axios.get("/spotify2/" + result.title)
            .then(function(response) {
                var id = response.data;
                console.log(id);
            });

    },
    // this is getting the initial scrapes from the database

    getArticle: function() {
        return axios.get("/api");
    },

    // this will change the "saved" database property to true

    postArticle: function(result) {
        console.log("id is: " + result);
        return axios.post('/saved', { id: result });
    },

    // this will change the "saved" database property to false

    deleteArticle: function(result) {
        console.log("helper reached with " + result);
        return axios.post('/delete', { id: result });
    }
};
// We export the API helper
module.exports = helpers;
