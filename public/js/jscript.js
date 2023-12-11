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

const a = document.getElementById("refreshbutton");
// async function sendRefresh() {
// document.addEventListener("DOMContentLoaded", function () {
//   a.addEventListener("click", async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/refresh", {
//         method: "get",
//       });

//       if (response.ok) {
//         const data = await response.json();

//         console.log(data);
//       } else {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.log(`Network error: ${error}`);
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  async function sendRefresh() {
    const baseUrl = window.location.protocol + "//" + window.location.host;

    const fullURL = baseUrl + "/refresh";

    const accessToken = getCookie("jwtAccess");
    if (!accessToken) {
      return;
    }

    try {
      const response = await fetch(fullURL, { method: "get" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`Network error: ${error}`);
    }
  }
  // no-need, server hanling it
  setInterval(sendRefresh, 20 * 60 * 1000);
});
