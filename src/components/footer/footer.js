const footerPlaceHolder = document.getElementById('footer-placeholder');

fetch('src/components/footer/footer.html', { cache: 'no-store' })
    .then(response => response.text())
    .then(data => {
        footerPlaceHolder.innerHTML = data;
    })
    .catch(error => console.error('Помилка завантаження футера:', error));