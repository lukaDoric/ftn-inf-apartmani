class Apartment {
    constructor(id, name, capacity, pricePerNight, petsAllowed) {
      this.id = id
      this.name = name
      this.capacity = capacity
      this.pricePerNight = pricePerNight
      this.petsAllowed = petsAllowed
    }
}

function initializeForm() {
    // Učitaj postojeće apartmane
    let apartmentsString = localStorage.getItem("apartments");
    let apartments = []
    if(apartmentsString) {
        apartments = JSON.parse(apartmentsString)
    }

    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    if(id) { // Postavi formu spram toga da li menja postojeći apartman ili dodaje nov
        initializeUpdateForm(id, apartments);
    } else {
        initializeAddForm(apartments);
    }
}

function initializeUpdateForm(id, apartments) {
    let apartment = null
    for(const a of apartments) {
        if(a.id == id) {
            apartment = a
            break
        }
    }
    if (!apartment) { // Ako je naveden id apartmana koji ne postoji, vrati se na sve
        window.location.href = '../apartments/apartments.html'
    }
    
    document.querySelector('input[name="name"]').value = apartment.name;
    document.querySelector('input[name="capacity"]').value = apartment.capacity;
    document.querySelector('input[name="pricePerNight"]').value = apartment.pricePerNight;
    if(apartment.petsAllowed) {
        document.querySelector('input[name="petsAllowed"][value="true"]').checked = true;
    } else {
        document.querySelector('input[name="petsAllowed"][value="false"]').checked = true;
    }

    let submitBtn = document.querySelector('#submitBtn')
    submitBtn.addEventListener('click', function() {
        // Izvuci podatke iz forme
        const formApartment = getFormData()
    
        // Izmeni postojeći apartman
        for(const apartment of apartments) {
            if(apartment.id == id) {
                apartment.name = formApartment.name
                apartment.capacity = formApartment.capacity
                apartment.pricePerNight = formApartment.pricePerNight
                apartment.petsAllowed = formApartment.petsAllowed
                break
            }
        }

        localStorage.setItem("apartments", JSON.stringify(apartments))
        // Prebaci se na pregled svih apartmana
        window.location.href = '../apartments/apartments.html'
    })
}

function initializeAddForm(apartments) {
    let submitBtn = document.querySelector('#submitBtn')
    submitBtn.addEventListener('click', function() {
        // Izvuci podatke iz forme
        const formApartment = getFormData()
    
        // Sačuvaj nov apartman
        let newId = calculateNewId(apartments)
        apartments.push(new Apartment(newId, formApartment.name, formApartment.capacity, formApartment.pricePerNight, formApartment.petsAllowed))

        localStorage.setItem("apartments", JSON.stringify(apartments))
        // Prebaci se na pregled svih apartmana
        window.location.href = '../apartments/apartments.html'
    })
}

function getFormData() {
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    const name = formData.get('name')
    const capacity = formData.get('capacity')
    const pricePerNight = formData.get('pricePerNight')
    const petsAllowed = formData.get('petsAllowed') === "true"

    return {
        name,
        capacity,
        pricePerNight,
        petsAllowed
    }
}

function calculateNewId(apartments) {
    let maxId = 0;
    for (let i = 0; i < apartments.length; i++) {
        if(apartments[i].id > maxId) {
            maxId = apartments[i].id
        }
    }
    return maxId + 1;
}

document.addEventListener("DOMContentLoaded", initializeForm)