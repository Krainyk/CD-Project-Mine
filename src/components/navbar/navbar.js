const navbarPlaceHolder = document.getElementById('navbar-placeholder');

fetch('src/components/navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        navbarPlaceHolder.innerHTML = data;



        const currentUrl = window.location.href;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');

            // console.log(curruntUrl);
            // console.log(window.location.href);

            if (link.href === currentUrl) {
                link.classList.add('active');
            }
        });


        const burgerBtn = document.getElementById('burger-btn');
        const navList = document.getElementById('nav-list');

        if (burgerBtn && navList) {
            burgerBtn.addEventListener('click', () => {
                navList.classList.toggle('active');
            });
        }

        document.body.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !burgerBtn.contains(e.target)) {
                navList.classList.remove('active');
            }
        });
    })
    .catch(error => console.error('Помилка завантаження навбара:', error));