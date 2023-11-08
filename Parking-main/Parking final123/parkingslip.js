  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRraBhL8tRK0OdoQia0h2iyl0E962qrMs",
  authDomain: "parkingproject-e9f8c.firebaseapp.com",
  databaseURL: "https://parkingproject-e9f8c-default-rtdb.firebaseio.com",
  projectId: "parkingproject-e9f8c",
  storageBucket: "parkingproject-e9f8c.appspot.com",
  messagingSenderId: "301869465154",
  appId: "1:301869465154:web:743ea862a5ba02696bb7db"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function updateUI(data) {
  const dataDiv = document.getElementById("data-div");

  if (dataDiv) {
    const newDataDiv = document.createElement("div");
    newDataDiv.innerHTML = `
      Vehicle Number: ${data.vehicleNumber}<br>
      Vehicle Type: ${data.vehicleType}<br>
      In Time: ${data.inTime}<br>
      Payment Method: ${data.selectedPaymentOption}<br>
      Slot: ${data.slot}<br><br>
    `;
    dataDiv.appendChild(newDataDiv);
  } else {
    console.error("data-div element not found.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const parkingDataRef = ref(db, "parkingData");
  onValue(parkingDataRef, snapshot => {
    const data = snapshot.val();
    if (data) {
      const keys = Object.keys(data);
      const lastEnteredKey = keys[keys.length - 1];
      const lastEnteredData = data[lastEnteredKey];
      updateUI(lastEnteredData);
    }
  });
});