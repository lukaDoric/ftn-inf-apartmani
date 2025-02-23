class Apartment {
  constructor(name, capacity, pricePerNight, petsAllowed) {
    this.name = name
    this.capacity = capacity
    this.pricePerNight = pricePerNight
    this.petsAllowed = petsAllowed
  }
}
  
let apartments = []
  
function createApartmentRows() {
  let table = document.querySelector("#apartments")

  for (let i = 0; i < apartments.length; i++) {
    let tr = document.createElement("tr")
    
    let rb = document.createElement("td")
    let name = document.createElement("td")
    
    rb.textContent = i + 1
    name.textContent = apartments[i].name
    
    tr.appendChild(rb)
    tr.appendChild(name)
    table.appendChild(tr)
    
    tr.addEventListener("click", function () {
      displayApartmentDetails(apartments[i])
    })
  }
}

function displayApartmentDetails(apartment) { // TODO
  let petsAllowed = "NO"
  if (apartment.pets === 'true') petsAllowed = "YES"

  let apartmentName = document.querySelector("#name")
  apartmentName.innerHTML = apartment.name

  let description = document.querySelector("#description")
  description.innerHTML = "<br>" + "Capacity: " + apartment.capacity + "<br>" + "Price (per night): " + apartment.pricePerNight +
  "<br>" + "Pets allowed: " + petsAllowed
}


function initializeApartments() {
  let apartmentsString = localStorage.getItem("apartments");
  if(apartmentsString) {
    apartments = JSON.parse(apartmentsString)
  }
  
  createApartmentRows()
  drawChart()
}

function drawChart() {
  const ctx = document.getElementById("myChart")
  let labels = []
  let colors = []
  let borderColors = []
  let data = []

  for (let i = 0; i < apartments.length; i++) {
    labels.push(apartments[i].name)
    colors.push("rgba(99, 133, 255, 0.2)")
    borderColors.push("rgb(99, 174, 255)")
    data.push(apartments[i].pricePerNight)
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Cene hotela po noci",
          data: data,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

document.addEventListener("DOMContentLoaded", initializeApartments)