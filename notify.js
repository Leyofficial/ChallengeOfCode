const modal = document.querySelector('.modal-alert');
const modalText = document.querySelector('.text-alert');
const closeModalPrevent = document.querySelector('.close-modal');
function createNotify(text) {

    modal.classList.toggle('gonne');
    modal.classList.toggle('active')
    modalText.innerHTML = text

    forTimeout = setTimeout(() => {
        modal.classList.toggle('gonne');
        modal.classList.toggle('active')
    }, 4000)

    closeModalPrevent.addEventListener('click', closeModalPermanent);
}

function closeModalPermanent() {
    modal.classList.toggle('gonne');
    modal.classList.toggle('active')
    clearTimeout(forTimeout);

}