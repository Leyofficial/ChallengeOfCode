const slide = document.querySelector('.left-slide');
document.querySelector('#burger').addEventListener('click', burgerCheck);
function burgerCheck() {
    if (this.checked) {
        document.body.style.overflow = "hidden";
        document.querySelector('.overlay').classList.remove('hidden');
        slide.classList.remove('gone');
        slide.classList.add('active')
    } else {
        document.body.style.overflow = "unset";
        slide.classList.add('gone');
        slide.classList.remove('active')
        document.querySelector('.overlay').classList.add('hidden')
    }
}
