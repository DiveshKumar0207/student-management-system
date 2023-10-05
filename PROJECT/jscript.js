// <<<----nav button trigerring class------>>>
const nav_button = document.querySelector(".nav_button");
const sidebar_android = document.querySelector(".sidebar_android");
const sidebar_small = document.querySelector(".sidebar_small");

nav_button.addEventListener("click", () => {
  nav_button.classList.toggle("open");
  sidebar_android.classList.toggle("open");
  sidebar_small.classList.toggle("open");
});

// <<,,----load loading animation---->>>
window.addEventListener("load", () => {
  const loader = document.querySelector(".animation_center");
  loader.classList.add("animation_center-hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  });
});
// <<<------------------inquiry-page//more details-button//----------->>>
const outputDiv = document.getElementById("More_Details");
const elements = ["More Details"];
let currentElementIndex = 0;

function printElement(element) {
  let index = 0;
  const interval = setInterval(() => {
    if (index < element.length) {
      outputDiv.textContent += element[index];
      index++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        eraseElement(element);
      }, 1000); // Adjust the delay as needed
    }
  }, 100); // Adjust the speed as needed
}

function eraseElement(element) {
  let index = element.length - 1;
  const interval = setInterval(() => {
    if (index >= 0) {
      outputDiv.textContent = outputDiv.textContent.slice(0, -1);
      index--;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        currentElementIndex = (currentElementIndex + 1) % elements.length;
        printElement(elements[currentElementIndex]);
      }, 1000); // Adjust the delay as needed
    }
  }, 100); // Adjust the speed as needed
}

printElement(elements[currentElementIndex]);

// <<<-------------------inquiry table summary ----------------->>>
const summary1 = document.querySelector(".summary1");
const summary2 = document.querySelector(".summary2");
const summary3 = document.querySelector(".summary3");
const summary4 = document.querySelector(".summary4");

const summary_btn1 = document.querySelector(".summary_btn1");
const summary_btn2 = document.querySelector(".summary_btn2");
const summary_btn3 = document.querySelector(".summary_btn3");
const summary_btn4 = document.querySelector(".summary_btn4");

summary_btn1.addEventListener("mouseover", () => {
  summary1.classList.toggle("open1");
  summary_btn1.classList.toggle("open1");
});
summary_btn1.addEventListener("mouseout", () => {
  summary1.classList.toggle("open1");
  summary_btn1.classList.toggle("open1");
});

summary_btn2.addEventListener("mouseover", () => {
  summary2.classList.toggle("open1");
  summary_btn2.classList.toggle("open1");
});
summary_btn2.addEventListener("mouseout", () => {
  summary2.classList.toggle("open1");
  summary_btn2.classList.toggle("open1");
});
summary_btn3.addEventListener("mouseover", () => {
  summary3.classList.toggle("open1");
  summary_btn3.classList.toggle("open1");
});
summary_btn3.addEventListener("mouseout", () => {
  summary3.classList.toggle("open1");
  summary_btn3.classList.toggle("open1");
});
summary_btn4.addEventListener("mouseover", () => {
  summary4.classList.toggle("open1");
  summary_btn4.classList.toggle("open1");
});
summary_btn4.addEventListener("mouseout", () => {
  summary4.classList.toggle("open1");
  summary_btn4.classList.toggle("open1");
});
