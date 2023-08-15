document.querySelector('.before-weak').addEventListener('click', before);
document.querySelector('.after-weak').addEventListener('click', after);
document.querySelector('.button-confirm').addEventListener('click', sendInfo);


let counter = 0;

let data = [0, 0, 0, 0, 0, 0, 0];

const infoWeeks = {}

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
let dayonnum = n - 1; // n - 1 сегоднящний день 
const filterDay = days.filter((item) => {
    if (dayOfWeek === item) {
        console.log(dayonnum);
        data.splice(dayonnum, 1, 0.10);
        return item
    }
})

function after() {

}

function before() {
    saveToLC()
}
function sendInfo() {
    dayonnum += n + 0
    const input = document.querySelector('.input');
    const inputValue = +input.value;

    data.splice(dayonnum, 1, inputValue);
    // console.log(infoWeeks[`weak${counter}`].length);
    if (data.length > 7) {
        dayonnum = n -1
        console.log(dayonnum);
        const splicedlastvalue = +infoWeeks[`weak${counter}`].splice(7, 1)
        counter++
        data = [splicedlastvalue, 0, 0, 0, 0, 0, 0]
        document.querySelector('.title-graph').textContent = `Weak ${counter}`
        infoWeeks[`weak${counter}`] = [splicedlastvalue, 0, 0, 0, 0, 0, 0];
        saveToLC()
        renderChart()
        return
    } else {
        infoWeeks[`weak${counter}`] = data;
        saveToLC();
        renderChart();
    }
    saveToLC();
    createNotify('Well done today!');
    renderChart();
    // infoWeeks[`weak${counter}`]; --- last week 
}

function saveToLC() {
    localStorage.setItem('graph-data', JSON.stringify(infoWeeks))
}
function noteLastWeak() {
    if (!localStorage.getItem('graph-data')) return
    const response = JSON.parse(localStorage.getItem('graph-data'));
    const lastWeakGraph = response[`weak${counter}`];
    
    JSON.stringify(localStorage.setItem('lastweak' , lastWeakGraph));
    data =  JSON.parse(localStorage.getItem('lastweak'));
    document.querySelector('.title-graph').textContent = `Weak ${counter}`
}



let myChart = null;

function renderChart() {
    const response = JSON.parse(localStorage.getItem('graph-data'))
    const thisWeak = response[`weak${counter}`];

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
