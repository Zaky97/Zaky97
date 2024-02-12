import { app, auth, signInWithEmailAndPassword } from "./firebase.js";

const signIn = async (email, password) => {
  try {
    if (!email.endsWith("@gmail.com")) {
      throw new Error("Hanya alamat Gmail yang diperbolehkan.");
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    Swal.fire({
      icon: "success",
      title: "Login Berhasil!",
      text: "Anda akan dialihkan ke halaman utama dalam 2 detik.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        window.location.replace("index.html");
        console.log("Masuk berhasil:", userCredential.user.uid);
      },
    });
  } catch (error) {
    let errorMessage = "Pastikan email dan password Anda benar.";
    if (error.code === "auth/user-not-found") {
      errorMessage = "Akun tidak ditemukan.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Password yang dimasukkan salah.";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Terlalu banyak percobaan masuk. Coba lagi nanti.";
    }
    Swal.fire({
      icon: "error",
      title: "Masuk Gagal",
      text: errorMessage,
    });
  }
};

const showSignIn = () => {
  const sign_in_btn = document.getElementById("sign-in-btn");
  sign_in_btn.click();
  sign_in_btn.addEventListener("click", () => {
    container.classList.add("sign-in-mode");
  });
};

document.querySelector(".sign-in-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector(
    ".sign-in-form input[type='email']"
  ).value;
  const password = document.querySelector(
    ".sign-in-form input[type='password']"
  ).value;
  signIn(email, password);
});

auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "index.html";
  }
});
