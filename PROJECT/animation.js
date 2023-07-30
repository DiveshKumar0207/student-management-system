// <<,,----load loading animation---->>>
window.addEventListener("load", () => {
    const loader = document.querySelector(".animation_center");
    loader.classList.add("animation_center-hidden");

    loader.addEventListener("transitionend",() =>{
        document.body.removeChild("loader");

    });


} )