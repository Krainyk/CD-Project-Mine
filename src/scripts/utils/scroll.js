export function initScrollIntoSection() {
    const scrollBtns = document.querySelectorAll('.scroll-btn');

    scrollBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ block: "center", behavior: "smooth" });
        });
    });
}