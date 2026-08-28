export function initMoveLine() {
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
}