const miniTrendPlaceHolder = document.getElementById('mini-trend-cards-placeholder');

fetch('src/components/cards/mini-trend-cards.html')
    .then(res => res.text())
    .then(minitrendData => {
        miniTrendPlaceHolder.innerHTML = minitrendData;
    })
    .catch(error => {
        console.log('Помилка в завантаженні популярних карток головної сторінки:', error)
    });
