const filterableItem = document.querySelectorAll('.filterable-item');

filterableItem.forEach(item => {
    const itemDownloads = item.dataset.downloads;
    const maxDownload = 619662276;

    const itemRateValue = (Math.log10(itemDownloads) / (Math.log10(maxDownload)));

   console.log("Розрахований рейтинг: ", itemRateValue);
    
});