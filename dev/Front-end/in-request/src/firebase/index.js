import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyB8fmbeFCz6MflVeRF-pU7N5WyPCDbQDQw",
    authDomain: "in-request.firebaseapp.com",
    databaseURL: "https://in-request.firebaseio.com",
    projectId: "in-request",
    storageBucket: "in-request.appspot.com",
    messagingSenderId: "566878675007",
    appId: "1:566878675007:web:234477171d4f9c7311d88a",
    measurementId: "G-5PRZRKXFQ2"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const auth = firebase.auth();
const fdb = firebase.firestore();
export {
    storage, auth, fdb, firebase as default
}

