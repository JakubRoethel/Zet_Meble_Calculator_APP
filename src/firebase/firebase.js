import firebase from "firebase";
import "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCptHukAweh2IePmJxHeZK7AbARxqZ_dCE",
  authDomain: "zetmeble-app.firebaseapp.com",
  databaseURL: "https://zetmeble-app-default-rtdb.firebaseio.com",
  projectId: "zetmeble-app",
  storageBucket: "zetmeble-app.appspot.com",
  messagingSenderId: "289413001126",
  appId: "1:289413001126:web:1c885bb8f8b2281b52e967"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




  export default firebase;