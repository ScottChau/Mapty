"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// Geolocation

// make 'map' to become global scope
let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords; // const latitude = position.coords.latitude;
    const { longitude } = position.coords; // const longitude = position.coords.longitude;
    console.log(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    );

    const coords = [latitude, longitude];
    map = L.map("map").setView(coords, 13); // zoom in , zoom out for second parameter

    L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // similar to addEventListener
    // Handling clicks on map
    map.on("click", function (mapE) {
      // make 'mapE' become global variable
      mapEvent = mapE;
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";

  // Display marker
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
