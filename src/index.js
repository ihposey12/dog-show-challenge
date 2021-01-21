getAllDogs()

function getAllDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => loadDog(dog)))
}

function loadDog(dog) {
    let tableBody = document.querySelector('#table-body')
    let tableRow = document.createElement('tr')
    let tableName = document.createElement('td')
    let tableBreed = document.createElement('td')
    let tableSex = document.createElement('td')
    let tableButton = document.createElement('td')
    let btn = document.createElement('button')

    tableName.textContent = dog.name
    tableBreed.textContent = dog.breed
    tableSex.textContent = dog.sex
    btn.textContent = 'Edit Dog'
    tableButton.addEventListener('click', () => populateForm(dog))

    tableBody.appendChild(tableRow)
    tableRow.append(tableName, tableBreed, tableSex, tableButton)
    tableButton.appendChild(btn)
}

function populateForm(dog) {
    let form = document.querySelector('#dog-form')
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.dataset.id = dog.id
    form.addEventListener('submit', (e) => handleSubmit(e))
}

function handleSubmit(e) {
    e.preventDefault()
    const dogId = e.target.dataset.id
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "name": e.target.name.value,
            "breed": e.target.breed.value,
            "sex": e.target.sex.value
        })
    })
    .then(res => res.json())
    .then(edited => loadDog(edited))
}