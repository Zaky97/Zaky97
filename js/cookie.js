import {
  app,
  database,
  auth,
  ref,
  push,
  onValue,
  remove,
  update,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "./firebase.js";

// Function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", function () {
  // If Firebase token exists, redirect to main page
  const firebaseToken = getCookie("firebaseToken");
  if (!firebaseToken) {
    window.location.replace("login.html");
  }

  // Mendapatkan semua elemen input
  const inputElements = document.querySelectorAll("input");

  // Loop melalui setiap elemen input
  inputElements.forEach(function (input) {
    // Mengecek apakah ada nilai yang disimpan di localStorage
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) {
      // Mengatur nilai input ke nilai yang disimpan di localStorage
      input.value = savedValue;
    }

    // Menyimpan nilai setiap kali input berubah
    input.addEventListener("input", function () {
      localStorage.setItem(input.id, input.value);
    });
  });
});
