const percent = 96;
const circle = document.querySelector('.progress-ring-fill');

const offset = 251.2 - (251.2 * percent / 100);

setTimeout(() => {
    circle.style.strokeDashoffset = offset;
}, 50);


const observerOptions = {
    root: null,
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item, .compat-progress').forEach(item => {
    statsObserver.observe(item);
});