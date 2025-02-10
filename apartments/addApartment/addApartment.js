let submitBtn = document.querySelector('#submitBtn')
submitBtn.addEventListener('click', function() {
    const form = document.getElementById('form')
    const formData = new FormData(form)

    const name = formData.get('name')
    const capacity = formData.get('capacity')
    const pricePerNight = formData.get('pricePerNight')
    const petsAllowed = formData.get('petsAllowed') === "true"

    window.location.href = `../apartments/apartments.html?name=${name}&pricePerNight=${pricePerNight}&capacity=${capacity}&petsAllowed=${petsAllowed}`
})
