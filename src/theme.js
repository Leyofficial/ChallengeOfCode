const btnTheme = document.querySelector('.button-theme');
const body = document.body;
const login = document.querySelector('#login');
const switchtheme = document.querySelector('.img_switch')

window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme')

    if (theme === 'dark') {
        setDarkTheme();
    } else {
        setLightTheme();
    }
});

btnTheme.addEventListener('click', switchTheme);

function setDarkTheme() {
    body.classList.add('themeColor')
    switchtheme.src = '/img/sunny_2952896.png'
    login.src = '/img/login-3.png'
    document.querySelector('.left-slide').style.backgroundColor = '#151515';
    document.querySelector('.text-slide').classList.add('dark')
}

function setLightTheme() {
    document.querySelector('.text-alert').style.color = 'white'
    switchtheme.src = '/img/moon_1812660.png'
    login.src = '/img/login.png'
    body.classList.remove('themeColor');
    document.querySelector('.left-slide').style.backgroundColor = 'white';
    document.querySelector('.text-slide').style.color = '#5891ff';
    document.querySelector('.text-slide').classList.remove('dark')
}

function switchTheme() {
    body.classList.toggle('themeColor')
    if (body.classList.contains('themeColor')) {
        localStorage.setItem('theme', 'dark')
        setDarkTheme();
    } else {
        localStorage.setItem('theme', 'light')
        setLightTheme();
    }
}
