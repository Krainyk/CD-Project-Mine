/* ==========================================
   1. ІМПОРТИ ФУНКЦІЙ (FUNCTIONS)
========================================== */
import { initFilterLogic } from "../components/filter/filter.js";
import { initSearchLogic } from "../components/search/search.js";

const miniTrendPlaceHolder = document.getElementById('mini-trend-cards-placeholder');
const trendingPlaceHolder = document.getElementById('trending-placeholder');
const modPlaceHolder = document.getElementById('mod-placeholder');
const filterPlaceHolder = document.getElementById('filter-placeholder');
const searchPlaceHolder = document.getElementById('input-search-placeholder');

Promise.all([
   fetch('src/components/cards/mini-trend-cards.html').then(res => res.text()),
   fetch('src/components/cards/trend-cards.html').then(res => res.text()),
   fetch('src/components/cards/mod-cards.html').then(res => res.text()),
   fetch('src/components/filter/filter.html').then(res => res.text()),
   fetch('src/components/search/search.html').then(res => res.text())
])
   .then(([minitrendData, trendData, modData, filterData, searchData]) => {
      if (miniTrendPlaceHolder) miniTrendPlaceHolder.innerHTML = minitrendData;
      if (trendingPlaceHolder) trendingPlaceHolder.innerHTML = trendData;
      if (modPlaceHolder) modPlaceHolder.innerHTML = modData;
      if (filterPlaceHolder) {
         filterPlaceHolder.outerHTML = filterData;
         initFilterOption();
      }
      if (searchPlaceHolder) searchPlaceHolder.outerHTML = searchData;

      console.log("Всі елементи завантажились");



      if (document.querySelector('.mod-grid')) {
         initFilterLogic();
         initSearchLogic();
      }
   })
   .catch(error => console.log("Сталась помилка в завантаденні елементів", error));


