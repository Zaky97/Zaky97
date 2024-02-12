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
} from "firebase.js";

const signUpAndSendEmailVerification = async (email, password) => {
  try {
    if (!email.endsWith("@gmail.com")) {
      throw new Error("Hanya alamat Gmail yang diperbolehkan.");
    }

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods && methods.length > 0) {
      throw new Error(
        "Email sudah digunakan. Gunakan email lain atau gunakan opsi lupa password."
      );
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser);

    console.log("Pendaftaran berhasil:", userCredential.user.uid);
    Swal.fire({
      icon: "success",
      title: "Pendaftaran Berhasil!",
      text: "Silakan cek email Anda untuk verifikasi.",
    }).then(() => {
      document.querySelector(".sign-in-form input[type='email']").value = email;
      document.querySelector(".sign-in-form input[type='password']").value =
        password;

      showSignIn();
    });
  } catch (error) {
    let errorMessage = "Terjadi kesalahan saat mendaftarkan pengguna baru.";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "Email sudah digunakan. Gunakan email lain atau gunakan opsi lupa password.";
        break;
      case "auth/weak-password":
        errorMessage =
          "Password terlalu lemah. Gunakan password dengan setidaknya 8 karakter.";
        break;
      default:
        errorMessage = error.message;
        break;
    }
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
  }
};

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

    // Check if the email is verified
    if (!userCredential.user.emailVerified) {
      throw new Error(
        "Email belum diverifikasi. Silakan cek email Anda untuk verifikasi."
      );
    }

    const idToken = await userCredential.user.getIdToken();
    document.cookie = `firebaseToken=${idToken}; path=/`;

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
        document.getElementById("email").value = email;
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
    } else if (error.code === "auth/email-not-verified") {
      errorMessage =
        "Email belum diverifikasi. Silakan cek email Anda untuk verifikasi.";
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

document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector(
    ".sign-up-form input[type='email']"
  ).value;
  const password = document.querySelector(
    ".sign-up-form input[type='password']"
  ).value;
  signUpAndSendEmailVerification(email, password);
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.cookie.indexOf("userLoggedIn=true") !== -1) {
    window.location.replace("/index.html");
  }

  // If Firebase token exists, redirect to main page
  const firebaseToken = getCookie("firebaseToken");
  if (firebaseToken) {
    window.location.replace("/index.html");
  }
});

// Function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
