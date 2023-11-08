// Function to collect all uppercase letters and numbers from the number plate text
function collectUppercaseLettersAndNumbers(text) {
    const matches = text.match(/[A-Z0-9]/g);

    if (matches) {
        return matches.join('');
    }

    return '';
}

// Variables
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture-button");
const closeButton = document.getElementById("close-button");
const result = document.getElementById("result");
const properNumberPlateOutput = document.getElementById("proper-number-plate");
let imageCounter = 0;
let stream; // Store the camera stream for later closing

// Initialize the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        this.stream = stream; // Store the stream in the variable
    })
    .catch((error) => {
        console.error("Error accessing the camera: ", error);
    });

// Function to capture an image and detect the number plate
captureButton.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Perform OCR using Tesseract.js
    Tesseract.recognize(
        canvas,
        'eng', // Language code, e.g., 'eng' for English
        { logger: (info) => console.log(info) } // Optional logger for debugging
    )
    .then(({ data: { text } }) => {
        if (text) {
            const collectedChars = collectUppercaseLettersAndNumbers(text);
            saveNumberPlateToCSV(imageCounter, collectedChars);
            displayResult(`Number Plate Detected: ${text}`);
            displayProperNumberPlate(`${collectedChars}`);
        } else {
            displayResult("Number Plate not detected");
            displayProperNumberPlate("Proper Number Plate not available");
        }

        imageCounter++;
    })
    .catch((error) => {
        console.error("Error performing OCR: ", error);
    });
});

// Function to save the number plate to a CSV file
function saveNumberPlateToCSV(imageId, numberPlate) {
    // You can implement saving to CSV here.
    // This example does not include actual CSV writing.
    console.log(`Image ID: ${imageId}, Number Plate: ${numberPlate}`);
}

// Function to display results
function displayResult(message) {
    result.innerHTML = message;
}

// Function to display the proper number plate
function displayProperNumberPlate(message) {
    properNumberPlateOutput.innerHTML = message;
}

// Function to close the camera when the "Close Camera" button is clicked
closeButton.addEventListener("click", () => {
    if (stream) {
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        video.srcObject = null;
    }
});


// Add an event listener to the "Copy Vehicle Number" button
document.getElementById("copy-vehicle-number-button").addEventListener("click", function () {
    // Get the vehicle number from the "proper-number-plate" div
    const vehicleNumber = document.getElementById("proper-number-plate").textContent;
    // Store the vehicle number in local storage for easy access in worker.html
    localStorage.setItem("copiedVehicleNumber", vehicleNumber);
});
