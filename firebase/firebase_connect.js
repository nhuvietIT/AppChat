const firebase = require("firebase")

const otherApp = firebase.initializeApp({
    apiKey: "AIzaSyD7_W1SGapgcNF0iRdU0mRFTHQH_KG_LHk",
    authDomain: "minigamerandom.firebaseapp.com",
    databaseURL: "https://minigamerandom-default-rtdb.firebaseio.com",
    projectId: "minigamerandom",
    storageBucket: "minigamerandom.appspot.com",
    messagingSenderId: "897601849414",
    appId: "1:897601849414:web:82521c3ac0b3cf5e67a247",
    measurementId: "G-1QKEH8MYB4"
});
 module.exports = otherApp
