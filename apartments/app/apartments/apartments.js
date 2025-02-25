class Apartment {
  constructor(id, name, capacity, pricePerNight, petsAllowed) {
    this.id = id
    this.name = name
    this.capacity = capacity
    this.pricePerNight = pricePerNight
    this.petsAllowed = petsAllowed
  }
}

function initializeApartments() {
  let apartments = []
  let apartmentsString = localStorage.getItem("apartments")
  if(apartmentsString) {
    apartments = JSON.parse(apartmentsString)
  }
  
  createApartmentRows(apartments)
  drawChart(apartments)
}
  
function createApartmentRows(apartments) {
  let table = document.querySelector("#apartments")

  for (let i = 0; i < apartments.length; i++) {
    let tr = document.createElement("tr")
    
    let rb = document.createElement("td")
    rb.textContent = i + 1
    let name = document.createElement("td")
    name.textContent = apartments[i].name

    let edit = document.createElement("td")
    let editButton = document.createElement("button")
    editButton.textContent = "Edit"
    editButton.addEventListener("click", function () { //
      window.location.href = '../apartmentForm/apartmentForm.html?id=' + apartments[i].id
    })
    edit.appendChild(editButton)
    
    tr.appendChild(rb)
    tr.appendChild(name)
    tr.appendChild(edit)
    table.appendChild(tr)
    
    tr.addEventListener("click", function () {
      displayApartmentDetails(apartments[i])
    })
  }
}

function displayApartmentDetails(apartment) {
  let petsAllowed = "NO"
  if (apartment.petsAllowed) {
    petsAllowed = "YES"
  }

  let apartmentName = document.querySelector("#name")
  apartmentName.innerHTML = apartment.name

  let description = document.querySelector("#description")
  description.innerHTML =
    "<br>" + "Capacity: " + apartment.capacity +
    "<br>" + "Price (per night): " + apartment.pricePerNight +
    "<br>" + "Pets allowed: " + petsAllowed
}

function drawChart(apartments) {
  const ctx = document.querySelector("#myChart")
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
          label: "Cene apartmana po noci",
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