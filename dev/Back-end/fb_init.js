let _firebase = require('firebase');
var config = {
    apiKey: "AIzaSyB8fmbeFCz6MflVeRF-pU7N5WyPCDbQDQw",
    authDomain: "in-request.firebaseapp.com",
    databaseURL: "https://in-request.firebaseio.com"
};

function f2(){
    _firebase.initializeApp(config);
}

async function fb_init(){
    // firebase
    await f2();
    return _firebase;
}

module.exports = fb_init;
