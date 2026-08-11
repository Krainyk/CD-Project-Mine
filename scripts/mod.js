const tabButtons = document.querySelectorAll('.mod-main-btns button');
const activeTabBtn = document.querySelector('.mod-main-btns .active');
const slidingLine = document.querySelector('.sliding-line');

function moveLine(button) {
    const tabBtnWidth = button.offsetWidth;
    const tabBtnLeft = button.offsetLeft;

    slidingLine.style.width = tabBtnWidth + 'px';
    slidingLine.style.left = tabBtnLeft + 'px';
}

moveLine(activeTabBtn);

tabButtons.forEach(button => {
    button.addEventListener('click', () => {

        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        moveLine(button);
    });
});

const primaryImage = document.querySelector('.main-mod-image');
const nextBtn = document.getElementById('mod-btn-next');
const prevBtn = document.getElementById('mod-btn-prev');
const secondaryImages = document.querySelectorAll('.secondary-mod-image');

let currentIndex = 0;
let autoPlayInterval

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


// const overviewBtn = document.getElementById('scroll-into-overview');
// const screenshotBtn = document.getElementById('scroll-into-screenshot');
// const compatibilityBtn = document.getElementById('scroll-into-compatibility');
// const changelogBtn = document.getElementById('scroll-into-changelog');
// const versionBtn = document.getElementById('scroll-into-version');

// const screenTargetSection = document.getElementById('screenshot-target-section');

// function scrollIntoScreenshots() {
//     screenTargetSection.scrollIntoView({ block: "center", behavior: "smooth" });
// }

// screenshotBtn.addEventListener('click', scrollIntoScreenshots);

const scrollBtns = document.querySelectorAll('.scroll-btn');

scrollBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ block: "center", behavior: "smooth" });
    });
});