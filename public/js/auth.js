// document.addEventListener("DOMContentLoaded", function () {
//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   }

//   async function refreshToken() {
//     const accessToken = getCookie("jwtAccess");

//     if (!accessToken) {
//       console.error("No access token found");
//       return;
//     }

//     try {
//       const response = await fetch("/refresh", { method: "POST" });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.log(`Network error: ${error}`);
//     }
//   }

//   function scheduleTokenRefresh() {
//     const accessToken = getCookie("jwtAccess");
//     if (!accessToken) {
//       console.error("No access token found");
//       return;
//     }

//     // jwtDecode cdn is used in head
//     const { exp } = jwtDecode(document.cookie);

//     const now = Math.floor(Date.now() / 1000); // Current time in seconds

//     // Calculate the time remaining until token expiration
//     const timeUntilExpiration = exp - now;

//     // Set a timeout to refresh the token before it expires
//     setTimeout(() => {
//       refreshToken();
//       // Reschedule the next token refresh
//       scheduleTokenRefresh();
//     }, (timeUntilExpiration - 60) * 1000); // Refresh 1 minute before expiration
//   }

//   // Call this function after a successful login to start the token refresh mechanism
//   scheduleTokenRefresh();

//   // setInterval(refreshToken, 10000);
// });
