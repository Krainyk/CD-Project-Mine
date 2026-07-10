const burgerBtn = document.getElementById('burger-btn');
const navList = document.getElementById('nav-list');

burgerBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});