
const weaks = JSON.parse(localStorage.getItem('graph-data'));

const highestValues = [];
const totalHours = [];
const totalDays = [];
for ( value in weaks){
    const arr = weaks[value];
    arr.forEach(element => {
        if (element > 0){
            totalDays.push(element)
        }
    });
    const total =  arr.reduce((a,b)=>a+b);
    totalHours.push(total);
    const max = arr.sort((a, b) => b - a)[0]; 
    highestValues.push(max);
}


const highestValue =  highestValues.sort((a, b)=> b - a)[0];
const totalTime  =  totalHours.reduce((a,b)=>a+b);


if (totalTime <= 20){
    document.querySelector('.span-value-1').textContent = totalTime;
} else {
    document.querySelector('.span-value-1').textContent = 20;
    document.querySelector('#reward-img-1').src = 'img/free-icon-approve-sign-8643280.png';
}
if (totalTime <=100 ){
    document.querySelector('.span-value-2').textContent = totalTime;
}
else {
    document.querySelector('.span-value-2').textContent = 100;
    document.querySelector('#reward-img-2').src = 'img/free-icon-approve-sign-8643280.png';
}
if (totalTime <= 1000){
    document.querySelector('.span-value-3').textContent = totalTime;
} else{ 
    document.querySelector('.span-value-3').textContent = 1000;
    document.querySelector('#reward-img-3').src = 'img/free-icon-approve-sign-8643280.png';
}



if(totalDays.length < 30){
    document.querySelector('.span-value-4').textContent = Math.floor(totalDays.length / 30)
} else {
    document.querySelector('.span-value-4').textContent = 1;
    document.querySelector('#reward-img-4').src = 'img/free-icon-approve-sign-8643280.png';
}

if(totalDays.length < 90){
    document.querySelector('.span-value-5').textContent = Math.floor(totalDays.length / 30)
} else {
    document.querySelector('.span-value-5').textContent = 3;
    document.querySelector('#reward-img-5').src = 'img/free-icon-approve-sign-8643280.png';
}

if(totalDays.length < 180){
    document.querySelector('.span-value-6').textContent = Math.floor(totalDays.length / 30)
} else {
    document.querySelector('.span-value-6').textContent = 6;
    document.querySelector('#reward-img-6').src = 'img/free-icon-approve-sign-8643280.png';
}


document.querySelector('.value-1>span').textContent = highestValue;
document.querySelector('.value-2>span').textContent = totalTime;
document.querySelector('.value-3>span').textContent = totalDays.length
