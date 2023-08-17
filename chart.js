document.querySelector('.before-weak').addEventListener('click', before);
document.querySelector('.after-weak').addEventListener('click', after);
document.querySelector('.button-confirm').addEventListener('click', sendInfo);

let counter = JSON.parse(localStorage.getItem('counter')) || 0;

let data = JSON.parse(localStorage.getItem('data')) || [0, 0, 0, 0, 0, 0, 0];

const infoWeeks = JSON.parse(localStorage.getItem('graph-data')) || {}

const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
];



const date = new Date();
const options = { weekday: 'long' };
const dayOfWeek = date.toLocaleString('ru', options);

const d = new Date();
const n = d.getDay();
let dayonnum = JSON.parse(localStorage.getItem('day')) || n - 1; // n - 1 сегоднящний день 
// const filterDay = days.filter((item) => {
//     if (dayOfWeek === item) {
//         console.log(dayonnum);
//         data.splice(dayonnum, 1, 0.10);
//         return item
//     }
// })

function after() {
    const lastValue = JSON.parse(localStorage.getItem('counter')|| 0);
    if (counter == lastValue || localStorage.getItem('counter') === 'null'){
        return
    }
    let last = infoWeeks[`weak${counter += 1}`];
    document.querySelector('.title-graph').textContent = `Weak ${counter}`
    const ctx = document.getElementById('myChart');
    if (myChart !== null) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {

        type: 'bar',

        data: {
            labels: ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Hours',

                data: [...last, 10],
                borderWidth: 1,
                backgroundColor: [
                    'rgb(87, 143, 255)',
                ],
                barPercentage: [
                    0.85
                ],
                categoryPercentage: [
                    1
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true

                },
            },
            layout: {
                margin: {
                    top: 250
                },
            }
        }
    });
}

function before() {
    if (counter === 0){
        return
    }
    let last = infoWeeks[`weak${counter -= 1}`];
    document.querySelector('.title-graph').textContent = `Weak ${counter}`
    const ctx = document.getElementById('myChart');
    if (myChart !== null) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {

        type: 'bar',

        data: {
            labels: ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Hours',

                data: [...last, 10],
                borderWidth: 1,
                backgroundColor: [
                    'rgb(87, 143, 255)',
                ],
                barPercentage: [
                    0.85
                ],
                categoryPercentage: [
                    1
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true

                },
            },
            layout: {
                margin: {
                    top: 250
                },
            }
        }
    });
}


function sendInfo() {
    // dayonnum += n - 2
    const input = document.querySelector('.input');
    const inputValue = +input.value;
    if (inputValue > 24) {
        createNotify('Вы не можете работать больше чем 24 ч в сутки)')
        return
    }
    data.splice(dayonnum, 1, inputValue);
    if (data.length > 7) {
        // dayonnum = n - 1 
        console.log(counter);
        // const splicedlastvalue = +infoWeeks[`weak${counter}`].splice(7, 1);
        const splicedlastvalue = +data.splice(7, 1)
        counter++
        console.log(splicedlastvalue);
        data = [splicedlastvalue, 0, 0, 0, 0, 0, 0]
        document.querySelector('.title-graph').textContent = `Weak ${counter}`
        infoWeeks[`weak${counter}`] = [splicedlastvalue, 0, 0, 0, 0, 0, 0];
        saveToLC();
        saveCurrentDay()
        renderChart();
        saveData()
        saveCounter()
    } else {
        infoWeeks[`weak${counter}`] = data;
        saveToLC();
        renderChart();
        saveData()
        saveCounter()
    }
    saveToLC();
    createNotify('Well done today!');
    renderChart();
    saveData();
    saveCounter();
    saveCurrentDay()
    // infoWeeks[`weak${counter}`]; --- last week 
}

function saveToLC() {
    localStorage.setItem('graph-data', JSON.stringify(infoWeeks))
}
function saveData() {
    localStorage.setItem('data', JSON.stringify(data))
}
function saveCounter() {
    localStorage.setItem('counter', JSON.stringify(counter))
}
function saveCurrentDay() {
    localStorage.setItem('day', JSON.stringify(dayonnum))
}
let myChart = null;

function renderChart() {
    // const thisWeak = JSON.parse(localStorage.getItem('last-weak')) * 
    const response = JSON.parse(localStorage.getItem('graph-data'));
    const thisWeak = response[Object.keys(response)[Object.keys(response).length - 1]];

    let lastKey;
    for (var key in response) {
        lastKey = key;
    }
    document.querySelector('.title-graph').textContent = lastKey.toUpperCase();
    try {
        const ctx = document.getElementById('myChart');
        if (myChart !== null) {
            myChart.destroy();
        }
        myChart = new Chart(ctx, {

            type: 'bar',

            data: {
                labels: ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label: 'Hours',

                    data: [...thisWeak, 10],
                    borderWidth: 1,
                    backgroundColor: [
                        'rgb(87, 143, 255)',
                    ],
                    barPercentage: [
                        0.85
                    ],
                    categoryPercentage: [
                        1
                    ]
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true

                    },
                },
                layout: {
                    margin: {
                        top: 250
                    },
                }
            }
        });
    }
    catch (err) {
        console.log(err);
    }

}
renderChart()
