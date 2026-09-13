import { updateModCount } from "../../scripts/counter.js";

export function initSearchLogic() {
    const searchInput = document.getElementById('mod-search');
    const filterableItem = document.querySelectorAll('.filterable-item');

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();

        filterableItem.forEach(item => {
            const title = item.querySelector('.mod-title');
            const text = title.textContent.toLowerCase();

            if (text.includes(searchText)) {
                item.classList.remove('hidden');

                setTimeout(() => {
                    item.classList.remove('fade-out');
                }, 10);
            } else {
                item.classList.add('fade-out');

                setTimeout(() => {
                    if (item.classList.contains('fade-out')) {
                        item.classList.add('hidden');
                    }
                }, 300);
            }
        });

        setTimeout(() => {
            updateModCount();
        }, 300);
    });
}