const urlInput = document.getElementById("urlInput");
const qrElement = document.getElementById("img");

function QrGen() {
  try {
    const url = urlInput.value.trim();
    
    // Validate URL
    if (url === "") {
      throw new Error("URL cannot be empty");
    }

    // Sanitize URL to prevent XSS
    const sanitizedUrl = encodeURI(url);

    // Generate QR code API URL
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${sanitizedUrl}&size=400x400`;

    // Set QR code image
    qrElement.innerHTML = `<img src="${qrApiUrl}" alt="QR Code" />`;
  } catch(error) {
    // Display error message to the user
    console.error("Error generating QR code:", error.message);
    // Optionally, you can display an error message on the page
    // errorMessageElement.textContent = "Error generating QR code: " + error.message;
  }
}
