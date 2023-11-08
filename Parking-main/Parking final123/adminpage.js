// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Initialize your Firebase app with your own configuration
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
const filterForm = document.getElementById("filterForm");

function updateTable(data) {
  const dataBody = document.getElementById("dataBody");

  if (dataBody) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td></td>
      <td>${data.vehicleNumber}</td>
      <td>${data.slot}</td>
      <td>${data.vehicleType}</td>
      <td>${data.selectedPaymentOption}</td>
      <td>${data.inTime}</td>
      <td>${data.outTime}</td>
    `;

    dataBody.appendChild(newRow);
    updateSrNo(); // Update the Sr. No. after adding a new row
  } else {
    console.error("dataBody element not found.");
  }
}

function updateSrNo() {
  const dataBody = document.getElementById("dataBody");
  const rows = dataBody.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    rows[i].getElementsByTagName("td")[0].textContent = i; // Set Sr. No.
  }
}

function applyFilters() {
  const vehicleTypeFilter = filterForm.vehicleType.value;
  const paymentMethodFilter = filterForm.paymentMethod.value;
  const inTimeSort = filterForm.inTimeSort.checked;
  const outTimeSort = filterForm.outTimeSort.checked;

  // Fetch the data based on selected filters
  const parkingDataRef = ref(db, "parkingData");
  onValue(parkingDataRef, snapshot => {
    const data = snapshot.val();
    if (data) {
      const filteredData = Object.values(data).filter(entry => {
        if (
          (vehicleTypeFilter === "All" || entry.vehicleType === vehicleTypeFilter) &&
          (paymentMethodFilter === "All" || entry.selectedPaymentOption === paymentMethodFilter)
        ) {
          return true;
        }
        return false;
      });

      if (inTimeSort) {
        filteredData.sort((a, b) => a.inTime.localeCompare(b.inTime));
      }

      if (outTimeSort) {
        filteredData.sort((a, b) => a.outTime.localeCompare(b.outTime));
      }

      dataBody.innerHTML = ""; // Clear the existing data

      filteredData.forEach(entry => {
        updateTable(entry);
      });
      updateSrNo(); // Update Sr. No. after applying filters
    }
  });
}

filterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  applyFilters();
});

document.addEventListener("DOMContentLoaded", () => {
  applyFilters(); // Apply filters when the page loads
});
