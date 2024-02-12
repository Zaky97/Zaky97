import { app, auth } from "./firebase.js";

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});
