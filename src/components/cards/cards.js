import { initFilterLogic } from "../filter/filter.js";

const trendingPlaceHolder = document.getElementById('trending-placeholder');
const modPlaceHolder = document.getElementById('mod-placeholder');

Promise.all([
    fetch('src/components/cards/trend-cards.html').then(res => res.text()),
    fetch('src/components/cards/mod-cards.html').then(res => res.text())
])
    .then(([trendData, modData]) => {
        trendingPlaceHolder.innerHTML = trendData;
        modPlaceHolder.innerHTML = modData;

        console.log("Всі картки завантажились одночасно");

        initFilterLogic();
    })
    .catch(error => {
        console.log("Помилка при завантаженні якигось карток", error)
    });