// <<<----nav button trigerring class------>>>
const nav_button = document.querySelector('.nav_button')
const sidebar_android = document.querySelector('.sidebar_android')
const sidebar_small = document.querySelector('.sidebar_small')

nav_button.addEventListener('click', () => {
    nav_button.classList.toggle('open')
    sidebar_android.classList.toggle('open')
    sidebar_small.classList.toggle('open')
    

})

// <<<--------Animation delay (enquiry page)--------->>>
var enq_details = document.querySelector('.enq_details p');
var on = false;

// setInterval(function () {
//     progbar.setAttribute('data-animation', (on) ? 'enq_details_animation' : '');
//     on = !on;
// }, 2500);

function update() {
    enq_details.setAttribute('data-animation', (on) ? 'enq_details_animation' : '')
    on = !on
    setTimer()
}

var setTimer = function () {
    setTimeout(function () {
        requestAnimationFrame(update);
    }, 2750);
};

setTimer();

// <<,,----load loading animation---->>>
window.addEventListener("load", () => {
    const loader = document.querySelector(".animation_center");
    loader.classList.add("animation_center-hidden");

    loader.addEventListener("transitionend",() =>{
        document.body.removeChild("loader");

    });


} )

// <<<-------------------inquiry table summary ----------------->>>
const summary1 = document.querySelector('.summary1')
const summary2 = document.querySelector('.summary2')
const summary3 = document.querySelector('.summary3')
const summary4 = document.querySelector('.summary4')

const summary_btn1 = document.querySelector('.summary_btn1')
const summary_btn2 = document.querySelector('.summary_btn2')
const summary_btn3 = document.querySelector('.summary_btn3')
const summary_btn4 = document.querySelector('.summary_btn4')


// var count=1;
// var mousein = false;
summary_btn1.addEventListener('mouseenter', () => {
    summary1.classList.toggle('open1')
    summary_btn1.classList.toggle('open1')
  
})
summary_btn1.addEventListener('mouseleave', () => {
    summary1.classList.toggle('open1')
    summary_btn1.classList.toggle('open1')
  
})


summary_btn2.addEventListener('mouseenter', () => {
 
    summary2.classList.toggle('open1')
    summary_btn2.classList.toggle('open1')
    

})
summary_btn2.addEventListener('mouseleave', () => {
 
    summary2.classList.toggle('open1')
    summary_btn2.classList.toggle('open1')
    

})
summary_btn3.addEventListener('mouseenter', () => {
    summary3.classList.toggle('open1')
    summary_btn3.classList.toggle('open1')
    

})
summary_btn3.addEventListener('mouseleave', () => {
    summary3.classList.toggle('open1')
    summary_btn3.classList.toggle('open1')
    

})
summary_btn4.addEventListener('mouseenter', () => {
    summary4.classList.toggle('open1')
    summary_btn4.classList.toggle('open1')
    

})
summary_btn4.addEventListener('mouseleave', () => {
    summary4.classList.toggle('open1')
    summary_btn4.classList.toggle('open1')
    

})
