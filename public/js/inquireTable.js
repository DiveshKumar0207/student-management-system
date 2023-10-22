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
