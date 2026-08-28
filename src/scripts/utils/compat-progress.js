const percent = 96;
const circle = document.querySelector('.progress-ring-fill');

const offset = 251.2 - (251.2 * percent / 100);

setTimeout(() => {
    circle.style.strokeDashoffset = offset;
}, 50);