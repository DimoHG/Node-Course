console.log("JS Loaded!")

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form');
const searchForm = document.querySelector('input');
const successMessageTag = document.querySelector('#success');
const errorMessageTag = document.querySelector('#error');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchForm.value;
    successMessageTag.textContent = 'Loading...';
    errorMessageTag.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                successMessageTag.textContent = '';
                errorMessageTag.textContent = data.error;
                return;
            }
            successMessageTag.textContent = data.forecast;
        })
    })
})
