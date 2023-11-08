
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRraBhL8tRK0OdoQia0h2iyl0E962qrMs",
    authDomain: "parkingproject-e9f8c.firebaseapp.com",
    databaseURL: "https://parkingproject-e9f8c-default-rtdb.firebaseio.com",
    projectId: "parkingproject-e9f8c",
    storageBucket: "parkingproject-e9f8c.appspot.com",
    messagingSenderId: "301869465154",
    appId: "1:301869465154:web:129b2cd0a64353996bb7db"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Function to save the number plate to Firebase Firestore
function saveNumberPlateToFirebase(imageId, numberPlate) {
  const db = firebase.firestore();
  const collection = db.collection('numberPlates'); // Change 'numberPlates' to your collection name

  collection.add({
      imageId: imageId,
      numberPlate: numberPlate,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}
