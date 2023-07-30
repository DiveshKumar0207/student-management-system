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