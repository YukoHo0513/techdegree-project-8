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
                <div class="profile">
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
    console.log(index)
    let name = employees[index].name.first + " " + employees[index].name.last;
    let email = employees[index].email;
    let city = employees[index].location.city;
    let picture = employees[index].picture.large; 
    let phone = employees[index].phone;
    let dob = employees[index].dob.date;
    let date = (new Date(dob)).toLocaleDateString('en-US');
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
            <p>Birthday: ${date}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
}
profileContainer.addEventListener('click', (e) => {
    overlay.className = "overlay"
    if (e.target.className === "card" || e.target.parentElement.className === "profile" || e.target.parentElement.className === "card") {
        if (e.target.className === "card") {
            let stringIndex = e.target.getAttribute("data-index");
            let numIndex = parseInt(stringIndex);
            displayModal(numIndex);
        } else if (e.target.parentElement.className === "profile") {
            let stringIndex = e.target.parentElement.parentElement.getAttribute("data-index");
            let numIndex = parseInt(stringIndex);
            displayModal(numIndex);
        } else if (e.target.parentElement.className === "card") {
            let stringIndex = e.target.parentElement.getAttribute("data-index");
            let numIndex = parseInt(stringIndex);
            displayModal(numIndex);
        }
    }   
})
closeButton.addEventListener('click', ()=> {
    overlay.className = "hidden";
}) 
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
fetchData(urlAPI);