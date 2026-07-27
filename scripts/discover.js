/* ==========================================
   1. ЗМІННІ (DOM-ЕЛЕМЕНТИ)
========================================== */
const filterDropdown = document.querySelector('.filter-dropdown');
const filterBtn = document.getElementById('filter-btn');
const clearBtns = document.querySelectorAll('.clear-btn');

const checkboxes = document.querySelectorAll('.js-filter');
const sortRadios = document.querySelectorAll('input[name="sort"]');
const cards = document.querySelectorAll('.mod-card');


/* ==========================================
   2. ЛОГІКА ВИПАДАЮЧОГО МЕНЮ (DROPDOWN)
========================================== */
filterBtn.addEventListener('click', () => {
    filterDropdown.classList.toggle('active');
});

document.body.addEventListener('click', (e) => {
    if (!filterDropdown.contains(e.target) && !filterBtn.contains(e.target)) {
        filterDropdown.classList.remove('active');
    }
});


/* ==========================================
   3. ЛОГІКА ФІЛЬТРАЦІЇ (ЧЕКБОКСИ)
========================================== */
function applyFilters() {
    let activeFilters = []; // Порожній масив для зберігання фільтрів

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


/* ==========================================
   4. ЛОГІКА СОРТУВАННЯ (РАДІОКНОПКИ)
========================================== */
function applySorting() {
    const sortValue = document.querySelector('input[name="sort"]:checked').value;
    const modContainer = document.querySelector('.mod-grid');
    const visibleCards = Array.from(modContainer.querySelectorAll('.mod-card:not(.hidden)'));

    // console.log(sortValue);

    visibleCards.sort((cardA, cardB) => {
        let valueA, valueB;

        if (sortValue === 'most-popular') {
            valueA = parseFloat(cardA.getAttribute('data-downloads'));
            valueB = parseFloat(cardB.getAttribute('data-downloads'));
        }
        else if (sortValue === 'newest') {
            valueA = parseFloat(cardA.getAttribute('data-date'));
            valueB = parseFloat(cardB.getAttribute('data-date'));
        }
        else if (sortValue === 'best-rated') {
            valueA = parseFloat(cardA.getAttribute('data-rating'));
            valueB = parseFloat(cardB.getAttribute('data-rating'));

            const ratingDiffrence = valueB - valueA;

            if (ratingDiffrence !== 0) {
                return ratingDiffrence;
            }

            valueA = parseFloat(cardA.getAttribute('data-downloads'));
            valueB = parseFloat(cardA.getAttribute('data-downloads')); 
        }

        return valueB - valueA;
    });

    visibleCards.forEach(card => {
        modContainer.append(card);
    });
}

sortRadios.forEach(radio => {
    // console.log("Фукція сортування викликана!");
    radio.addEventListener('change', applySorting);
});


/* ==========================================
   5. ЛОГІКА ОЧИЩЕННЯ (КНОПКИ CLEAR)
========================================== */
clearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        checkboxes.forEach(e => {
            e.checked = false;
        });

        sortRadios.forEach(e => {
            e.checked = false;
        });

        applyFilters();
    });
});