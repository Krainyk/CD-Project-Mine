import { updateModCount } from "../../scripts/counter.js";

export function initSearchLogic() {
    const searchInput = document.getElementById('mod-search');
    const cards = document.querySelectorAll('.mod-card');

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
}