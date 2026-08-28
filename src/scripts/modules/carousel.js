export function initCarouselLogic() {
    const primaryImage = document.querySelector('.main-mod-image');
    const nextBtn = document.getElementById('mod-btn-next');
    const prevBtn = document.getElementById('mod-btn-prev');
    const secondaryImages = document.querySelectorAll('.secondary-mod-image');

    let currentIndex = 0;
    let autoPlayInterval;

    function autoStartPlay() {
        clearInterval(autoPlayInterval);

        autoPlayInterval = setInterval(() => {
            currentIndex++;
            if (currentIndex === secondaryImages.length) {
                currentIndex = 0;
            }

            refreshModImage();
        }, 3000);
    }
    autoStartPlay();

    function autoStopPlay() {
        clearInterval(autoPlayInterval);
    }

    primaryImage.addEventListener('mouseenter', autoStopPlay);
    primaryImage.addEventListener('mouseleave', autoStartPlay);

    function refreshModImage() {
        const newImageSrc = secondaryImages[currentIndex].src;

        secondaryImages.forEach(img => {
            img.classList.remove('active-thumb');
        });
        secondaryImages[currentIndex].classList.add('active-thumb');

        primaryImage.classList.add('fade-out');

        setTimeout(() => {
            primaryImage.src = newImageSrc;

            primaryImage.classList.remove('fade-out')
        }, 300);
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex === secondaryImages.length) {
            currentIndex = 0;
        }

        refreshModImage();

    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = secondaryImages.length - 1;
        }
        refreshModImage();
    });

    secondaryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;

            refreshModImage();
        });
    });
}