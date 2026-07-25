const filterDropdown = document.querySelector('.filter-dropdown');
const filterBtn = document.getElementById('filter-btn');

filterBtn.addEventListener('click', () => {
    filterDropdown.classList.toggle('active');
});




// const sortContainer = document.getElementById('sort-container');
// const sortBtn = document.getElementById('sort-btn');
// const selectedSort = document.getElementById('selected-sort');
// const sortItems = document.querySelectorAll('.sort-item');

// sortBtn.addEventListener('click', () => {
//     sortContainer.classList.toggle('open');
// });

// sortItems.forEach((item) => {
//     item.addEventListener('click', () => {
//         selectedSort.textContent = item.textContent;
//         sortContainer.classList.remove('open');
//     });
// }); 