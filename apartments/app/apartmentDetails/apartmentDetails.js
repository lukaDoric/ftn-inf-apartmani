const urlParams = new URLSearchParams(window.location.search)
const name = urlParams.get('name')
const capacity = urlParams.get('capacity')
const pricePerNight = urlParams.get('pricePerNight')
const pets = urlParams.get('petsAllowed')

let petsAllowed = "NO"
if (pets === 'true') petsAllowed = "YES"

let apartmentName = document.querySelector("#name")
apartmentName.innerHTML = name

let description = document.querySelector("#description")
description.innerHTML = "<br>" + "Capacity: " + capacity + "<br>" + "Price (per night): " + pricePerNight +
"<br>" + "Pets allowed: " + petsAllowed
