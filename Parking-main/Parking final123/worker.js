// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

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
const analytics = getAnalytics(app);

// Get a reference to the Realtime Database
const db = getDatabase();

function selectPayment(option) {
  const paymentDetailsDiv = document.getElementById("payment-details");
  paymentDetailsDiv.innerHTML = `Selected Payment Option: ${option}`;
}

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form data
  const vehicleNumber = document.getElementById("vehicle-number").value;
  const vehicleType = document.getElementById("vehicle-type").value;
  const slot = document.getElementById("slot").value;
  const selectedPayment = document.querySelector("input[name='payment-method']:checked");
  const selectedPaymentOption = selectedPayment ? selectedPayment.value : "";

  // Get the current time
  const inTime = getCurrentTime();

  // Store data in the Realtime Database
  const parkingDataRef = ref(db, "parkingData");
  push(parkingDataRef, {
    vehicleNumber: vehicleNumber,
    vehicleType: vehicleType,
    inTime: inTime, // Set inTime to the current time
    slot: slot,
    selectedPaymentOption: selectedPaymentOption,
  })
  .then(() => {
    console.log("Data stored successfully.");
  })
  .catch(error => {
    console.error("Error adding data: ", error);
  });
});

// Function to get the current time in the format HH:mm
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


// ...
let currentBikeSlot = 1;
let currentCarSlot = 1;
    
document.getElementById("vehicle-type").addEventListener("change", function() { 
  const vehicleType = document.getElementById("vehicle-type").value;
  const slotField = document.getElementById("slot");
  if (vehicleType === "bike") {
    slotField.value = `B${currentBikeSlot}`;
  } else if (vehicleType === "car") {
    slotField.value = `C${currentCarSlot}`;
  }
});
    
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  const vehicleType = document.getElementById("vehicle-type").value;
  if (vehicleType === "bike") {
    currentBikeSlot++;
  } else if (vehicleType === "car") {
    currentCarSlot++;
  }
  const slotField = document.getElementById("slot");
    slotField.value = vehicleType === "bike" ? `B${currentBikeSlot}` : `C${currentCarSlot}`;
});

// Retrieve the copied vehicle number from local storage
const copiedVehicleNumber = localStorage.getItem("copiedVehicleNumber");

// Set the retrieved vehicle number in the "vehicle-number" input field
if (copiedVehicleNumber) {
    document.getElementById("vehicle-number").value = copiedVehicleNumber;
}
