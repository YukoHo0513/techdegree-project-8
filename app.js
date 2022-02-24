let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&nat=us,ca,au`;
const profileContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const closeButton = document.querySelector('.modal-close');
const rightClick = document.querySelector('.right-click');
const leftClick = document.querySelector('.left-click');
const modalIndex = document.querySelector('.modal');
const searchIcon = document.querySelector('.search-icon');

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
        let {name: {first, last}, email, location: {city}, picture: {medium}} = employee;
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img src="${medium}" alt="${first} ${last}'s profile photo" class="avatar">
                <div class="profile">
                    <h2>${first} ${last}</h2>
                    <p>${email}</p>
                    <p>${city}</p>
                </div>
            </div>
        `
    });
    profileContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let {name: {first, last}, email, location: {street: {number, name: streetName}, city, state, postcode}, picture: {large}, phone, dob: {date}} = employees[index];
    let birthDate = (new Date(date)).toLocaleDateString('en-US');
    modal.innerHTML = `
        <img src="${large}" alt="${first} ${last}'s profile photo">
        <div class="text-container" data-index="${index}">
            <h2>${first} ${last}</h2>
            <p>${email}</p>
            <p class="city">${city}</p>
            <div class="border"></div>
            <p class="phone">${phone}</p>
            <p>${number} ${streetName} ${state} ${postcode}</p>
            <p>Birthday: ${birthDate}</p>
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
            modalIndex.setAttribute("data-index", stringIndex);
            displayModal(numIndex);
        } else if (e.target.parentElement.className === "profile") {
            let stringIndex = e.target.parentElement.parentElement.getAttribute("data-index");
            let numIndex = parseInt(stringIndex);
            modalIndex.setAttribute("data-index", stringIndex);
            displayModal(numIndex);
        } else if (e.target.parentElement.className === "card") {
            let stringIndex = e.target.parentElement.getAttribute("data-index");
            let numIndex = parseInt(stringIndex);
            modalIndex.setAttribute("data-index", stringIndex);
            displayModal(numIndex);
        }
    }   
})

let count = 0;

closeButton.addEventListener('click', ()=> {
    overlay.className = "hidden";
    count = 0;
}) 

rightClick.addEventListener('click', (e) => {
    let stringIndex = e.target.parentElement.getAttribute("data-index");
    let numIndex = parseInt(stringIndex);
    count += 1;
    let nextIndex = numIndex + count;
    if (nextIndex === employees.length) {
        e.target.parentElement.setAttribute("data-index", 0);
        count = 0;
        nextIndex = 0;
        displayModal(nextIndex);
    }
    displayModal(nextIndex);
})

leftClick.addEventListener('click', (e) => {

    let stringIndex = e.target.parentElement.getAttribute("data-index");
    let numIndex = parseInt(stringIndex);
    count -= 1;
    let previousIndex = numIndex + count;
    if (previousIndex === -1) {
        e.target.parentElement.setAttribute("data-index", 11);
        count = 0;
        previousIndex = 11;
        displayModal(previousIndex);
    }
    displayModal(previousIndex);
})

searchIcon.addEventListener('click', ()=> {
    
})

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
fetchData(urlAPI);

