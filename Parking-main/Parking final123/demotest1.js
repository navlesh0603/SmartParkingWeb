// Import the functions you need from the SDKs you need (from worker.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Your web app's Firebase configuration (from worker.js)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// Function to select a payment option (from worker.js)
function selectPayment(option) {
    const paymentDetailsDiv = document.getElementById("payment-details");
    paymentDetailsDiv.innerHTML = `Selected Payment Option: ${option}`;
}

// Function to get the current time in the format HH:mm (from worker.js)
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Rest of the JavaScript code from worker.js...

// Function to collect all uppercase letters and numbers from the number plate text (from test1.js)
function collectUppercaseLettersAndNumbers(text) {
    const matches = text.match(/[A-Z0-9]/g);

    if (matches) {
        return matches.join('');
    }

    return '';
}

// Variables and initialization for the camera (from test1.js)
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture-button");
const closeButton = document.getElementById("close-button");
const result = document.getElementById("result");
const properNumberPlateOutput = document.getElementById("proper-number-plate");
let imageCounter = 0;
let stream;

// Initialize the webcam (from test1.js)
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        this.stream = stream;
    })
    .catch((error) => {
        console.error("Error accessing the camera: ", error);
    });

// Function to capture an image and detect the number plate (from test1.js)
captureButton.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Rest of the code from test1.js...

    // Perform OCR using Tesseract.js (from test1.js)
    Tesseract.recognize(
        canvas,
        'eng',
        { logger: (info) => console.log(info) }
    )
    .then(({ data: { text } }) => {
        // Rest of the code from test1.js...

        imageCounter++;
    })
    .catch((error) => {
        console.error("Error performing OCR: ", error);
    });
});

// Function to save the number plate to a CSV file (from test1.js)
function saveNumberPlateToCSV(imageId, numberPlate) {
    console.log(`Image ID: ${imageId}, Number Plate: ${numberPlate}`);
}

// Function to display results (from test1.js)
function displayResult(message) {
    result.innerHTML = message;
}

// Function to display the proper number plate (from test1.js)
function displayProperNumberPlate(message) {
    properNumberPlateOutput.innerHTML = message;
}

// Function to close the camera (from test1.js)
closeButton.addEventListener("click", () => {
    if (stream) {
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        video.srcObject = null;
    }
});

// Add an event listener to the "Copy Vehicle Number" button (from test1.js)
document.getElementById("copy-vehicle-number-button").addEventListener("click", function () {
    const vehicleNumber = document.getElementById("proper-number-plate").textContent;
    localStorage.setItem("copiedVehicleNumber", vehicleNumber);
});
