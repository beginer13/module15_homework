
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#btnId');
    btn.addEventListener('click', () => {
        let scrWidth = window.screen.width;
        let scrHeight = window.screen.availHeight;
        console.log(scrWidth, scrHeight);
        window.alert(` Sreen width is ${scrWidth} and height is ${scrHeight}`)
    });
})