/* ==========================================
   1. ІМПОРТ ЛІЧИЛЬНИКА (MOD COUNT)
========================================== */
import { updateModCount } from "./counter.js";

/* ==========================================
   2. ЛОГІКА ПОШУКУ (ПОЛЕ INPUT)
========================================== */
export function initmodSearchLogic() {
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