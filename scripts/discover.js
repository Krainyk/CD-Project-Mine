/* ==========================================
   1. ЗМІННІ (DOM-ЕЛЕМЕНТИ)
========================================== */
const filterDropdown = document.querySelector('.filter-dropdown');
const filterBtn = document.getElementById('filter-btn');
const clearBtns = document.querySelectorAll('.clear-btn');

const checkboxes = document.querySelectorAll('.js-filter');
const sortRadios = document.querySelectorAll('input[name="sort"]');
const cards = document.querySelectorAll('.mod-card');

const modContainer = document.querySelector('.mod-grid');
const modCardArray = Array.from(modContainer.querySelectorAll('.mod-card'));

const selectedFilter = document.querySelector('.selected-text');

const searchInput = document.getElementById('mod-search');

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


const modCount = document.getElementById('mods-count');

function updateModCount() {
    const visibleCards = document.querySelectorAll('.mod-card:not(.hidden)');
    const count = visibleCards.length;

    if (count.toString() === modCount.textContent) {
        return;
    }

    modCount.classList.add('count-fade');

    setTimeout(() => {
        modCount.textContent = count;

        modCount.classList.remove('count-fade');
    }, 200);
}

updateModCount();

/* ==========================================
   3. ЛОГІКА ФІЛЬТРАЦІЇ (ЧЕКБОКСИ)
========================================== */
function applyFilters() {
    let activeFilters = []; // Порожній масив для зберігання фільтрів

    let selectedOption = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            activeFilters.push(cb.value);

            selectedOption.push(cb);
        }

        if (selectedOption.length === 0) {
            selectedFilter.textContent = "Select filter";
        }
        else if (selectedOption.length === 1) {
            const selectedElement = selectedOption[0].nextElementSibling;
            selectedFilter.textContent = selectedElement.textContent;
        }
        else {
            selectedFilter.textContent = `Filter(${selectedOption.length})`;
        }
    });

    cards.forEach(card => {
        const cardGenre = card.getAttribute('data-genre').split(",");

        if (activeFilters.length === 0 || activeFilters.every(filter => cardGenre.includes(filter))) {
            card.classList.remove('hidden');

            setTimeout(() => {
                card.classList.remove('fade-out');
            }, 10);
        } else {
            card.classList.add('fade-out');

            setTimeout(() => {
                if (card.classList.contains('fade-out')) {
                    card.classList.add('hidden');
                }
            }, 300);
        }
    });

    setTimeout(() => {
        updateModCount();
    }, 300);
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

    visibleCards.forEach(card => {
        card.classList.add('fade-out');
    });

    setTimeout(() => {
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
                valueB = parseFloat(cardB.getAttribute('data-downloads'));
            }

            return valueB - valueA;
        });

        visibleCards.forEach(card => {
            modContainer.append(card);
        });

        setTimeout(() => {
            visibleCards.forEach(card => {
                card.classList.remove('fade-out');
            });
        }, 10);
    }, 300);
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

        const currentlyVisible = document.querySelectorAll('.mod-card:not(.hidden)');

        currentlyVisible.forEach(card => {
            card.classList.add('fade-out');
        });

        checkboxes.forEach(e => { e.checked = false; });
        sortRadios.forEach(e => { e.checked = false; });

        setTimeout(() => {
            modCardArray.forEach(card => {
                modContainer.append(card);
            });

            applyFilters();

            setTimeout(() => {
                modCardArray.forEach(card => {
                    card.classList.remove('fade-out');
                });
            }, 10);
        }, 300);
    });
});

const selectedInfo = document.querySelector('.selected-text');
const mobileSortRadio = document.querySelectorAll('.filter-mobile-option input[type="radio"]');

mobileSortRadio.forEach(radio => {
    radio.addEventListener('change', (e) => {

        const clickedInput = e.target;
        const siblingSpan = clickedInput.nextElementSibling;

        selectedInfo.textContent = siblingSpan.textContent;
    });
});


/* ==========================================
   6. ЛОГІКА ПОШУКУ (ПОЛЕ INPUT)
========================================== */
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('.mod-title');
        const text = title.textContent.toLowerCase();

        if (text.includes(searchText)) {
            card.classList.remove('hidden');

            setTimeout(() => {
                card.classList.remove('fade-out');
            }, 10);
        } else {
            card.classList.add('fade-out');

            setTimeout(() => {
                if (card.classList.contains('fade-out')) {
                    card.classList.add('hidden');
                }
            }, 300);
        }
    });

    setTimeout(() => {
        updateModCount();
    }, 300);
});