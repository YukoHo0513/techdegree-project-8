let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12`;
const profileContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const closeButton = document.querySelector('.modal-close');

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => data.results)
        .then(displayEmployees)
        .catch(error => console.log('Looks like there was a problem', error))
}
function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = "";
    employees.forEach((employee, index) => {
        let name = employee.name.first + " " + employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture.medium; 
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img src="${picture}" alt="${name}'s profile photo" class="avatar">
                <div>
                    <h2>${name}</h2>
                    <p>${email}</p>
                    <p>${city}</p>
                </div>
            </div>
        `
    });
    profileContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let name = employees[index].name.first + " " + employees[index].name.last;
    let email = employees[index].email;
    let city = employees[index].location.city;
    let picture = employees[index].picture.medium; 
    let phone = employees[index].phone;
    let dob = employees[index].dob;
    let date = new Date(dob);
    date.toLocaleDateString('en-US');
    let address = employees[index].location.street.number + " " + employees[index].location.street.name + ", " + employees[index].location.state + " " + employees[index].location.postcode
    modal.innerHTML = `
        <img src="${picture}" alt="${name}'s profile photo">
        <div class="text-container">
            <h2>${name}</h2>
            <p>${email}</p>
            <p class="city">${city}</p>
            <div class="border"></div>
            <p class="phone">${phone}</p>
            <p>${address}</p>
            <p>${date}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
}
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
console.log("words",fetchData(urlAPI));