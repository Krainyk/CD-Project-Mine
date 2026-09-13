import { updateModCount } from "../../scripts/counter.js";

export function initFilterLogic() {
    function initFilters() {
        const filterDropdown = document.querySelector('.filter-dropdown');
        const filterBtn = document.getElementById('filter-btn');

        filterBtn.addEventListener('click', () => {
            filterDropdown.classList.toggle('active');
        });

        document.body.addEventListener('click', (e) => {
            if (!filterDropdown.contains(e.target) && !filterBtn.contains(e.target)) {
                filterDropdown.classList.remove('active');
            }
        });

        const checkboxes = document.querySelectorAll('.js-filter');
        const filterableItem = document.querySelectorAll('.filterable-item');
        // const cards = document.querySelectorAll('.mod-card');
        const selectedFilter = document.querySelector('.selected-text');
        const clearBtns = document.querySelectorAll('.clear-btn');

        const filterableItemContainer = document.querySelector('.filterable-grid');
        const filterableItemArray = Array.from(filterableItemContainer.querySelectorAll('.filterable-item'));

        function applyFilters() {
            let activeLoaders = [];
            let activeVersions = [];
            let activeCategories = [];

            let selectedOption = [];

            checkboxes.forEach(cb => {
                if (cb.checked) {
                    if (cb.name === 'loader') {
                        activeLoaders.push(cb.value);
                    }
                    else if (cb.name === 'version') {
                        activeVersions.push(cb.value);
                    }
                    else if (cb.name === 'category') {
                        activeCategories.push(cb.value);
                    }

                    selectedOption.push(cb)
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


            filterableItem.forEach(card => {
                const itemLoader = (card.dataset.loader || "").split(",");
                const itemVersion = (card.dataset.version || "").split(",");
                const itemCategory = (card.dataset.category || "").split(",");
                const matchLoader = activeLoaders.length === 0 || activeLoaders.some(filter => itemLoader.includes(filter));


                const matchVersions = activeVersions.length === 0 || activeVersions.some(filter =>itemVersion.includes(filter));

                const matchCategories = activeCategories.length === 0 || activeCategories.some(filter => itemCategory.includes(filter));

                const matchFilters = (matchLoader && matchVersions && matchCategories);


                if (matchFilters) {
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

        clearBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                const currentlyVisible = document.querySelectorAll('.filterable-item:not(.hidden)');

                currentlyVisible.forEach(card => {
                    card.classList.add('fade-out');
                });

                const sortRadios = document.querySelectorAll('input[name="sort"]');

                checkboxes.forEach(e => { e.checked = false; });
                sortRadios.forEach(e => { e.checked = false; });

                setTimeout(() => {
                    filterableItemArray.forEach(card => {
                        filterableItemContainer.append(card);
                    });

                    applyFilters();

                    setTimeout(() => {
                        filterableItemArray.forEach(card => {
                            card.classList.remove('fade-out');
                        });
                    }, 10);
                }, 300);
            });
        });
    }


    /* ==========================================
       3. ЛОГІКА СОРТУВАННЯ (РАДІОКНОПКИ)
    ========================================== */
    function initSort() {
        const mobileSortRadio = document.querySelectorAll('.filter-mobile-option input[type="radio"]');
        const selectedInfo = document.querySelector('.selected-text');

        function applySorting() {
            const sortValue = document.querySelector('input[name="sort"]:checked').value;
            // const modContainer = document.querySelector('.mod-grid');
            const filterableItemContainer = document.querySelector('.filterable-grid');
            const visibleItems = Array.from(filterableItemContainer.querySelectorAll('.filterable-item:not(.hidden)'));

            // console.log(sortValue);

            visibleItems.forEach(card => {
                card.classList.add('fade-out');
            });

            setTimeout(() => {
                visibleItems.sort((cardA, cardB) => {
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

                visibleItems.forEach(card => {
                    filterableItemContainer.append(card);
                });

                setTimeout(() => {
                    visibleItems.forEach(card => {
                        card.classList.remove('fade-out');
                    });
                }, 10);
            }, 300);
        }

        const sortRadios = document.querySelectorAll('input[name="sort"]');

        sortRadios.forEach(radio => {
            // console.log("Фукція сортування викликана!");
            radio.addEventListener('change', applySorting);
        });

        mobileSortRadio.forEach(radio => {
            radio.addEventListener('change', (e) => {

                const clickedInput = e.target;
                const siblingSpan = clickedInput.nextElementSibling;

                selectedInfo.textContent = siblingSpan.textContent;
            });
        });
    }
    initFilters();
    initSort();
    updateModCount();
}