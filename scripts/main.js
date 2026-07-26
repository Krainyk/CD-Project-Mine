const burgerBtn = document.getElementById('burger-btn');
const navList = document.getElementById('nav-list');

burgerBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});


document.body.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !burgerBtn.contains(e.target)) {
        navList.classList.remove('active');
    }
});