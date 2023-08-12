const acountData = [];

window.onload = () => {
    if (!localStorage.getItem('accept')) {
        document.querySelector('#first-link').addEventListener('click', showSecondForm);
        document.querySelector('#second-link').addEventListener('click', showFirstForm);
    } else {
        for (let value of JSON.parse(localStorage.getItem('accountINFO'))) {
            document.querySelector('.login-name').textContent = value.login;
        }
        hideForms();
        createNotify('Welcome!')
    }
}

document.querySelector('.noopener').addEventListener('click', forgotPassword);

function forgotPassword() {
    const response = JSON.parse(localStorage.getItem('accountINFO'))[0];
    console.log(response);
    alert('Ваш логин : ' + response.login + ', Ваш пароль : ' + response.password);
}

document.querySelector('.button-sign-out').addEventListener('click', () => {
    showFirstForm()
    const burger = document.querySelector('#burger');
    const blockBurger = document.querySelector('.block-burger');
    blockBurger.classList.add('hidden')
    burger.checked = false;
    slide.classList.add('gone');
    slide.classList.remove('active')
    document.querySelector('.overlay').classList.remove('hidden');
    localStorage.setItem('accept', '')
})

document.querySelector('#second-sign').addEventListener('click', registrationAccount);
document.querySelector('#first-sign').addEventListener('click', loginAccount);

function showSecondForm() {
    document.querySelector('#first-form').classList.add('hidden');
    document.querySelector('#second-form').classList.remove('hidden');
}

function showFirstForm() {
    document.querySelector('#second-form').classList.add('hidden');
    document.querySelector('#first-form').classList.remove('hidden');
}

function hideForms() {
    document.querySelector('.form-container').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
}

function registrationAccount(e) {
    e.preventDefault();
    if (!localStorage.getItem('accountINFO')) {
        const createLogin = document.querySelector('#second-username').value;
        const createPassword = document.querySelector('#second-password').value;
        if (createLogin.length != 0 && createPassword.length != 0) {
            const info = {
                Date: Date.now(),
                login: createLogin,
                password: createPassword,
            }
            acountData.push(info);
            localStorage.setItem('accountINFO', JSON.stringify(acountData));
            createNotify('Спасибо за регестрацию!')
        } else {
            createError('Поле ввода данных не должно быть пустым', 'secondListError');
        }
    } else {
        createError('У вас уже есть аккаунт!', 'secondListError');
    }
    document.querySelector('#second-username').value = '';
    document.querySelector('#second-password').value = '';
}
function loginAccount(e) {
    e.preventDefault();
    const username = document.querySelector('#first-username').value;
    const password = document.querySelector('#first-password').value;
    const users = JSON.parse(localStorage.getItem('accountINFO'));
    if (localStorage.getItem('accountINFO')) {
        let isUserExist = false;
        users.forEach((item) => {
            if (username === item.login && password === item.password) {
                isUserExist = true;
                console.log(item);
                document.querySelector('.block-burger').classList.remove('hidden')
                createNotify('Welcome!')
                for (let value of JSON.parse(localStorage.getItem('accountINFO'))) {
                    document.querySelector('.login-name').textContent = value.login;
                }
            }
        });
        if (isUserExist) {
            localStorage.setItem('accept', true);
            hideForms();
        } else {
            createError('Такого пользователя не существует', 'firstListError');
        }
    } else {
        createError('Такого пользователя не существует', 'firstListError');
    }
    document.querySelector('#first-username').value = '';
    document.querySelector('#first-password').value = '';
}

function createError(text, idList) {
    const errorList = document.querySelector('#' + idList);
    if (errorList.children.length < 1) {
        const createError = document.createElement('div');
        createError.classList.add('error-message');
        createError.textContent = text;
        errorList.append(createError);
        setTimeout(() => createError.remove(), 4000);
    }
}
