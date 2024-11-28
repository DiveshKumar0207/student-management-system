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
    if (document.body.classList.contains("loader")) {
      document.body.removeChild("loader");
      console.log("yes");
    }
  });
});

// -------------------For the mark-attendance color -------------------------

document.addEventListener("DOMContentLoaded", () => {
  let selectopt = document.getElementById("attendanceSelect");

  function updateBackgroundColor() {
    if (selectopt.value === "present") {
      selectopt.style.backgroundColor = "green";
    } else if (selectopt.value === "absent") {
      selectopt.style.backgroundColor = "orange";
    }
  }

  // Call the function initially to set the background color based on the default value
  updateBackgroundColor();

  // Add an event listener to detect when the selection changes
  selectopt.addEventListener("change", updateBackgroundColor);
});

// <<<------------------inquiry-page//more details-button//----------->>>

// const outputDiv = document.getElementById("More_Details");
// const elements = ["More Details"];
// let currentElementIndex = 0;

// function printElement(element) {
//   let index = 0;
//   const interval = setInterval(() => {
//     if (index < element.length) {
//       outputDiv.textContent += element[index];
//       index++;
//     } else {
//       clearInterval(interval);
//       setTimeout(() => {
//         eraseElement(element);
//       }, 1000); // Adjust the delay as needed
//     }
//   }, 100); // Adjust the speed as needed
// }

// function eraseElement(element) {
//   let index = element.length - 1;
//   const interval = setInterval(() => {
//     if (index >= 0) {
//       outputDiv.textContent = outputDiv.textContent.slice(0, -1);
//       index--;
//     } else {
//       clearInterval(interval);
//       setTimeout(() => {
//         currentElementIndex = (currentElementIndex + 1) % elements.length;
//         printElement(elements[currentElementIndex]);
//       }, 1000); // Adjust the delay as needed
//     }
//   }, 100); // Adjust the speed as needed
// }

// printElement(elements[currentElementIndex]);

// <<<-------------------inquiry table summary ----------------->>>

// -----------------------------------
