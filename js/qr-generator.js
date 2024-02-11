// qr-generator.js

// Ambil elemen input teks dan tombol generate
const inputText = document.getElementById("inputText");
const generateButton = document.getElementById("generateButton");

// Tambahkan event listener untuk saat tombol generate ditekan
generateButton.addEventListener("click", generateQRCode);

// Fungsi untuk menghasilkan QR Code
function generateQRCode() {
  // Ambil teks dari input
  const text = inputText.value;

  // Periksa apakah input kosong
  if (text === "") {
    alert("Please enter some text to generate QR code.");
    return;
  }

  // Hapus QR Code yang lama jika ada
  const qrCodeDiv = document.getElementById("qrcode");
  qrCodeDiv.innerHTML = "";

  // Buat instance QRCode dari library QRCode.js
  const qr = new QRCode(qrCodeDiv, {
    text: text,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
