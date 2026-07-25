const filterDropdown = document.querySelector('.filter-dropdown');
const filterBtn = document.getElementById('filter-btn');

filterBtn.addEventListener('click', () => {
    filterDropdown.classList.toggle('active');
});



const checkboxes = document.querySelectorAll('.js-filter');
const cards = document.querySelectorAll('.mod-card');
// const sortRadios = document.querySelectorAll('input[name="sort"]');

function applyFilters() {
    let activeFilters = []; //Порожній масив для зберігання фільтрів

    checkboxes.forEach(cb => {
        if (cb.checked) {
            activeFilters.push(cb.value);
        }
    });

    cards.forEach(card => {
        const cardGenre = card.getAttribute('data-genre').split(",");

        if (activeFilters.length === 0 || activeFilters.every(filter => cardGenre.includes(filter))) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

checkboxes.forEach(cb => {
    cb.addEventListener('change', applyFilters);
});

// sortRadios.forEach(radio => {
//     radio.addEventListener('change', applySorting);
// }); 

// function applySorting() {
// }