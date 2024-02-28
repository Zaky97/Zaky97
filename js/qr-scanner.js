function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    // If found your qr code
    function onScanSuccess(decodeText, decodeResult) {
        alert("Your QR is: " + decodeText);
        window.location.href = decodeText;
    }

    let htmlscanner = new Html5QrcodeScanner(
        "reader", // No HTML element to render the scanner
        { fps: 10, qrbox: 250, preferFrontCamera: false }
    );
    htmlscanner.render(onScanSuccess);
});
