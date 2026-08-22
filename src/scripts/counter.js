/* ==========================================
   1. ФУНКЦІЯ ЛІЧИЛЬНИКА (MOD COUNT)
========================================== */
export function updateModCount() {
    const modCount = document.getElementById('mods-count');

    if (!modCount) return;

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