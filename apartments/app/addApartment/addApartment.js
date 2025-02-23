class Apartment {
    constructor(name, capacity, pricePerNight, petsAllowed) {
      this.name = name
      this.capacity = capacity
      this.pricePerNight = pricePerNight
      this.petsAllowed = petsAllowed
    }
}

let submitBtn = document.querySelector('#submitBtn')
submitBtn.addEventListener('click', function() {
    // Izvuci podatke iz forme
    const form = document.getElementById('form')
    const formData = new FormData(form)
    const name = formData.get('name')
    const capacity = formData.get('capacity')
    const pricePerNight = formData.get('pricePerNight')
    const petsAllowed = formData.get('petsAllowed') === "true"

    // Sačuvaj novi apartman
    let apartmentsString = localStorage.getItem("apartments");
    let apartments = []
    if(apartmentsString) {
        apartments = JSON.parse(apartmentsString)
    }
    apartments.push(new Apartment(name, capacity, pricePerNight, petsAllowed))
    localStorage.setItem("apartments", JSON.stringify(apartments))

    // Prebaci se na pregled svih apartmana
    window.location.href = '../apartments/apartments.html'
})
