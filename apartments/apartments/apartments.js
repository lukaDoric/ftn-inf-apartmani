class Apartment {
    constructor(name, capacity, pricePerNight, petsAllowed) {
      this.name = name
      this.capacity = capacity
      this.pricePerNight = pricePerNight
      this.petsAllowed = petsAllowed
    }
  }
  
  let apartments = []
  
  function createApartmentRow(apartment, index) {
    let table = document.querySelector("#apartments")
    let tr = document.createElement("tr")
  
    let rb = document.createElement("td")
    let name = document.createElement("td")
  
    rb.textContent = index + 1
    name.textContent = apartment.name
  
    tr.appendChild(rb)
    tr.appendChild(name)
    table.appendChild(tr)
  
    tr.addEventListener("click", function () {
      displayApartmentDetails(apartment)
    })
  }

  function displayApartmentDetails(apartment) {
    window.location.href = `../apartmentDetails/apartmentDetails.html?name=${apartment.name}&pricePerNight=${apartment.pricePerNight}&capacity=${apartment.capacity}&petsAllowed=${apartment.petsAllowed}`
  }
  
  
  function initializeApartments() {

    apartments = [
      new Apartment("Bella Vista", 2, 37, false),
      new Apartment("Fontana", 7, 67, true),
      new Apartment("Crown", 6, 52, false),
    ]

    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("name") != null) {
        const name = urlParams.get("name")
        const capacity = urlParams.get("capacity")
        const pricePerNight = urlParams.get("pricePerNight")
        const petsAllowed = urlParams.get("petsAllowed")
        let newApartment = new Apartment(name, capacity, pricePerNight, petsAllowed)
        apartments.push(newApartment)
    }
  
    for (let i = 0; i < apartments.length; i++) {
      createApartmentRow(apartments[i], i)
    }
  
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
      colors.push("rgba(255, 99, 132, 0.2)")
      borderColors.push("rgb(255, 99, 132)")
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
  