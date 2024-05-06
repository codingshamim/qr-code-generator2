document.addEventListener("DOMContentLoaded", function () {
    const scanButton = document.getElementById("scanButton");
    const scannerVideo = document.getElementById("scannerVideo");
    let facingMode = "environment"; // "user" for front camera, "environment" for back camera

    scanButton.addEventListener("click", function () {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Try to open the back camera by default
            openCameraStream("environment")
                .then(scanQRCode)
                .catch(function (error) {
                    console.error("Error accessing camera:", error);
                    // If there is an error with the back camera, try opening the front camera
                    openCameraStream("user")
                        .then(scanQRCode)
                        .catch(function (error) {
                            console.error("Error accessing camera:", error);
                        });
                });
        } else {
            console.error("getUserMedia not supported on your browser");
        }
    });

    function openCameraStream(cameraFacingMode) {
        return navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraFacingMode } })
            .then(function (stream) {
                // Display the camera stream in the video element
                scannerVideo.srcObject = stream;
                scannerVideo.play();
                facingMode = cameraFacingMode; // Update the facing mode
            });
    }

    function scanQRCode() {
        const barcodeDetector = new BarcodeDetector();
        barcodeDetector.detect(scannerVideo)
            .then(barcodes => {
                if (barcodes && barcodes.length > 0) {
                    console.log("Scanning result:", barcodes[0].rawValue);
                    // You can do further processing with the scanning result here
                } else {
                    console.log("No QR code detected");
                }
            })
            .catch(error => {
                console.error("QR code detection error:", error);
            });
    }
});