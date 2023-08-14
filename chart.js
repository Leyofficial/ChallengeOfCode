document.querySelector('.before-weak').addEventListener('click', before);
// document.querySelector('.after-weak').addEventListener('click', after);
document.querySelector('.button-confirm').addEventListener('click', sendInfo)

let counter = 0;



const data = [0 , 0 , 0, 0 ,0 ,0 ,0];

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
        data.splice(dayonnum, 1, 0.10)
        return item
    }
})

function before() {
    saveToLC()
}
function sendInfo() {
    console.log(counter);
    const input = document.querySelector('.input');
    const inputValue = +input.value;
    data.splice(dayonnum, 1, inputValue)
    if (infoWeeks[`weak${counter.length }`]> 7) return
    infoWeeks[`weak${counter}`] = data
    console.log(infoWeeks);
    saveToLC()
    createNotify('Well done today!')
    renderChart()
}

function saveToLC() {
    localStorage.setItem('graph-data', JSON.stringify(infoWeeks))
}

let myChart = null

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