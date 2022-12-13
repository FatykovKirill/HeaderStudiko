const changeCity = document.querySelector('.change-city');
const chooseCity = document.querySelector('.choose-city');
const loadCities = chooseCity.querySelector('.load-cities');
const choosenCity = chooseCity.querySelector('.choosen-city');
const cityItem = chooseCity.querySelectorAll('.city-item');
const searchCityBox = chooseCity.querySelector('.search-city-box');
const preLoader = loadCities.querySelector('.preloader');

async function getCities() {

    const getStudika = await fetch('https://studika.ru/api/areas', {
        method: 'POST'
    })

    const getResponse = await getStudika.json()

    return getResponse;
}

changeCity.addEventListener('click', () => {

    chooseCity.classList.toggle('active');
    getCities()
        .then(arr => {
            arr.map(item => {
                loadCities.insertAdjacentHTML('beforeend', `
            <div class="city-item">${item.name}</div>
            `)});
            preLoader.style.display = 'none';
        })
        
})

searchCityBox.addEventListener('input', () => {
    loadCities.innerHTML = '';
    const searchValue = searchCityBox.value.toLowerCase();
    getCities()
        .then(arr => arr.filter(item => item.name.toLowerCase().includes(searchValue)))
        .then(res => res.map(item => loadCities.insertAdjacentHTML('beforeend', `
        <div>${item.name}</div>
        `)))
});

